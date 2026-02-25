import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin, firestoreAdmin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';

const AD_CLICK_LIMIT = 4; // 4 clicks
const AD_CLICK_WINDOW_MINUTES = 10;
const AD_CLICK_WINDOW_MS = AD_CLICK_WINDOW_MINUTES * 60 * 1000;

interface ClickTrackerDoc {
  timestamps: Timestamp[];
  banned: boolean;
  status?: 'pending_ban' | 'banned_in_ads';
}

export async function POST(request: NextRequest) {
  if (!firestoreAdmin) {
    return NextResponse.json({ success: false, message: 'Firebase not configured' }, { status: 500 });
  }

  try {
    const { ip } = await request.json();

    if (!ip) {
      return NextResponse.json({ success: false, message: 'IP address is required' }, { status: 400 });
    }

    // Whitelist Google's known crawler IPs to prevent them from being banned.
    // The most common range for Googlebot is 66.249.64.0 - 66.249.95.255
    if (ip.startsWith('66.249.')) {
        console.log(`[Ad-Tracker] Ignoring Googlebot IP: ${ip}`);
        return NextResponse.json({ success: true, message: 'Googlebot ignored' });
    }

    const trackerRef = firestoreAdmin.collection('ad_clicks').doc(ip);
    const now = new Date();
    const windowStart = new Date(now.getTime() - AD_CLICK_WINDOW_MS);

    await firestoreAdmin.runTransaction(async (transaction) => {
      const doc = await transaction.get(trackerRef);
      const nowTimestamp = admin.firestore.Timestamp.fromDate(now);

      if (!doc.exists) {
        // First click for this IP
        const newDoc: ClickTrackerDoc = {
          timestamps: [nowTimestamp],
          banned: false,
        };
        transaction.set(trackerRef, newDoc);
        console.log(`First click recorded for IP: ${ip}`);
        return;
      }

      const data = doc.data() as ClickTrackerDoc;

      // If already banned or in process, do nothing.
      if (data.banned || data.status === 'banned_in_ads') {
        console.log(`IP ${ip} is already processed. Ignoring click.`);
        return;
      }
      
      // Filter timestamps to only include those within the time window
      const recentTimestamps = (data.timestamps || [])
        .map((t) => t.toDate())
        .filter((clickTime) => clickTime > windowStart);
      
      // Add the current click timestamp
      recentTimestamps.push(now);
      
      const recentClickFirestoreTimestamps = recentTimestamps.map(d => admin.firestore.Timestamp.fromDate(d));

      // Check if the click limit is reached
      if (recentTimestamps.length >= AD_CLICK_LIMIT) {
        // Ban the IP and set status for the cloud function to pick up
        transaction.update(trackerRef, {
          timestamps: recentClickFirestoreTimestamps,
          banned: true,
          status: 'pending_ban',
        });
        console.log(`IP ${ip} has been banned. Status set to pending_ban. Clicks: ${recentTimestamps.length}`);
      } else {
        // Just update the timestamps
        transaction.update(trackerRef, {
          timestamps: recentClickFirestoreTimestamps,
        });
        console.log(`Another click recorded for IP: ${ip}. Clicks in window: ${recentTimestamps.length}`);
      }
    });
    
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`[Ad-Tracker-API] Error processing request:`, error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
