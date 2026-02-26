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

// --- Google Ads API Helper ---
async function banIpInGoogleAds(ipAddress: string): Promise<boolean> {
    console.log(`[Ad-Tracker] Attempting to ban IP ${ipAddress} in Google Ads.`);

    const requiredEnv = [
        'GOOGLE_ADS_DEVELOPER_TOKEN', 'GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET',
        'GOOGLE_ADS_REFRESH_TOKEN', 'GOOGLE_ADS_LOGIN_CUSTOMER_ID', 'GOOGLE_ADS_CUSTOMER_ID'
    ];
    
    if (requiredEnv.some(envVar => !process.env[envVar])) {
        console.error(`[Ad-Tracker] Google Ads API credentials missing in .env.local. Cannot ban IP.`);
        return false;
    }

    try {
        const client = new GoogleAdsApi({
            client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
            client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
            developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        });

        const customer = client.Customer({
            customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
            login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!,
            refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
        });
        
        const campaignCriterion = {
            campaign: `customers/${process.env.GOOGLE_ADS_CUSTOMER_ID!}/campaigns/-1`, // -1 targets all campaigns
            ip_block: { ip_address: ipAddress },
            negative: true,
        };

        await customer.campaignCriteria.create([campaignCriterion]);
        console.log(`[Ad-Tracker] Successfully banned IP ${ipAddress} in Google Ads.`);
        return true;

    } catch (error: any) {
        if (error.errors?.some((e: any) => e.error_code?.criterion_error === 'IP_ADDRESS_ALREADY_EXCLUDED')) {
            console.log(`[Ad-Tracker] IP ${ipAddress} is already banned in Google Ads. Treating as success.`);
            return true;
        }
        console.error(`[Ad-Tracker] Failed to ban IP ${ipAddress} in Google Ads.`, error);
        return false;
    }
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
        console.log(`[Ad-Tracker] IP ${ip} reached click limit (${recentTimestamps.length}). Attempting ban...`);
        
        // IMPORTANT: Calling an external API within a transaction is generally discouraged.
        // However, for this use case, it's the simplest way to ensure atomicity.
        // If timeouts occur, a more complex queue-based system would be needed.
        const banSuccessful = await banIpInGoogleAds(ip);
        
        if (banSuccessful) {
          transaction.set(trackerRef, {
            timestamps: recentClickFirestoreTimestamps,
            status: 'banned_in_ads',
          });
        } else {
          // If ban fails, just log the click and keep monitoring. It will retry on the next click.
          transaction.set(trackerRef, { timestamps: recentClickFirestoreTimestamps, status: 'monitoring' });
          console.log(`[Ad-Tracker] Google Ads ban failed for ${ip}. Will retry on next click.`);
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
