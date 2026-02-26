import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin, firestoreAdmin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';
import { GoogleAdsApi } from 'google-ads-api';

export const runtime = 'nodejs';

// --- Configuration ---
const AD_CLICK_LIMIT = 4;
const AD_CLICK_WINDOW_MINUTES = 10;
const AD_CLICK_WINDOW_MS = AD_CLICK_WINDOW_MINUTES * 60 * 1000;

// --- Interfaces ---
interface ClickTrackerDoc {
  timestamps: Timestamp[];
  status: 'monitoring' | 'banned_in_ads';
}

interface GoogleAdsCredentials {
  developerToken: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  loginCustomerId: string;
  customerId: string;
}

// --- Google Ads API Helper ---
async function banIpInAllGoogleAdsAccounts(ipAddress: string): Promise<boolean> {
    console.log(`[Ad-Tracker] Attempting to ban IP ${ipAddress} in ALL Google Ads accounts.`);

    const credentialsJson = process.env.GOOGLE_ADS_ACCOUNTS;
    if (!credentialsJson) {
        console.error(`[Ad-Tracker] GOOGLE_ADS_ACCOUNTS environment variable is not set. Cannot ban IP.`);
        return false;
    }

    let credentials: GoogleAdsCredentials[];
    try {
        credentials = JSON.parse(credentialsJson);
        if (!Array.isArray(credentials) || credentials.length === 0) {
            throw new Error("GOOGLE_ADS_ACCOUNTS is not a valid JSON array or is empty.");
        }
    } catch (e: any) {
        console.error(`[Ad-Tracker] Failed to parse GOOGLE_ADS_ACCOUNTS from .env.local. Ensure it's a valid JSON array. Error:`, e.message);
        return false;
    }

    let allBansSuccessful = true;

    const results = await Promise.allSettled(credentials.map(async (cred, index) => {
        const accountId = cred.customerId || `(Account ${index + 1})`;
        console.log(`[Ad-Tracker] Processing ban for IP ${ipAddress} in account: ${accountId}`);

        try {
            const client = new GoogleAdsApi({
                client_id: cred.clientId,
                client_secret: cred.clientSecret,
                developer_token: cred.developerToken,
            });

            const customer = client.Customer({
                customer_id: cred.customerId,
                login_customer_id: cred.loginCustomerId,
                refresh_token: cred.refreshToken,
            });
            
            const campaignCriterion = {
                campaign: `customers/${cred.customerId}/campaigns/-1`, // -1 targets all campaigns
                ip_block: { ip_address: ipAddress },
                negative: true,
            };

            await customer.campaignCriteria.create([campaignCriterion]);
            console.log(`[Ad-Tracker] SUCCESS: Banned IP ${ipAddress} in account ${accountId}.`);
            return { status: 'fulfilled', accountId };

        } catch (error: any) {
            if (error.errors?.some((e: any) => e.error_code?.criterion_error === 'IP_ADDRESS_ALREADY_EXCLUDED')) {
                console.log(`[Ad-Tracker] INFO: IP ${ipAddress} is already banned in account ${accountId}. Treating as success.`);
                return { status: 'fulfilled', accountId };
            }
            console.error(`[Ad-Tracker] FAILED to ban IP ${ipAddress} in account ${accountId}.`, error);
            throw new Error(`Failed for account ${accountId}`);
        }
    }));
    
    results.forEach(result => {
        if (result.status === 'rejected') {
            allBansSuccessful = false;
        }
    });

    if (allBansSuccessful) {
        console.log(`[Ad-Tracker] IP ${ipAddress} was successfully processed for all accounts.`);
    } else {
        console.warn(`[Ad-Tracker] IP ${ipAddress} failed to be banned in one or more accounts. Check logs for details.`);
    }

    return allBansSuccessful;
}


// --- API Route Handler ---
export async function POST(request: NextRequest) {
  if (!firestoreAdmin) {
    return NextResponse.json({ success: true, message: 'Tracking service not configured (Firestore Admin).' });
  }

  try {
    const { ip } = await request.json();
    if (!ip) {
      return NextResponse.json({ success: false, message: 'IP address is required' }, { status: 400 });
    }
    if (ip.startsWith('66.249.')) {
        console.log(`[Ad-Tracker] Ignoring Googlebot IP: ${ip}`);
        return NextResponse.json({ success: true, message: 'Googlebot ignored' });
    }

    const trackerRef = firestoreAdmin.collection('ad_clicks').doc(ip);
    
    // The transaction ensures that we don't have race conditions if two clicks arrive at the same time.
    await firestoreAdmin.runTransaction(async (transaction) => {
      const doc = await transaction.get(trackerRef);
      const now = new Date();
      const nowTimestamp = admin.firestore.Timestamp.fromDate(now);
      const windowStart = new Date(now.getTime() - AD_CLICK_WINDOW_MS);

      let data: ClickTrackerDoc;
      if (!doc.exists) {
        data = { timestamps: [], status: 'monitoring' };
      } else {
        data = doc.data() as ClickTrackerDoc;
      }
      
      if (data.status === 'banned_in_ads') {
        console.log(`[Ad-Tracker] IP ${ip} is already banned. Ignoring new click.`);
        return; // Stop processing
      }
      
      const recentTimestamps = (data.timestamps || []).map(t => t.toDate()).filter(clickTime => clickTime > windowStart);
      recentTimestamps.push(now);
      const recentClickFirestoreTimestamps = recentTimestamps.map(d => admin.firestore.Timestamp.fromDate(d));

      if (recentTimestamps.length >= AD_CLICK_LIMIT) {
        console.log(`[Ad-Tracker] IP ${ip} reached click limit (${recentTimestamps.length}). Attempting ban in all accounts...`);
        
        // Call the new multi-account ban function
        const banSuccessful = await banIpInAllGoogleAdsAccounts(ip);
        
        if (banSuccessful) {
          transaction.set(trackerRef, {
            timestamps: recentClickFirestoreTimestamps,
            status: 'banned_in_ads',
          });
        } else {
          // If ban fails in any account, just log the click and keep monitoring. It will retry on the next click.
          transaction.set(trackerRef, { timestamps: recentClickFirestoreTimestamps, status: 'monitoring' });
          console.log(`[Ad-Tracker] Google Ads ban failed for ${ip} in at least one account. Will retry on next click.`);
        }

      } else {
        // Limit not reached, just update timestamps and keep monitoring.
        transaction.set(trackerRef, { timestamps: recentClickFirestoreTimestamps, status: 'monitoring' });
        console.log(`[Ad-Tracker] Another click recorded for ${ip}. Clicks in window: ${recentTimestamps.length}.`);
      }
    });
    
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`[Ad-Tracker-API] Unhandled error in request:`, error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
