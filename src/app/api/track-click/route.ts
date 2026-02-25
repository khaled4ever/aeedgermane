import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin, firestoreAdmin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

const AD_CLICK_LIMIT = 4; // 4 clicks
const AD_CLICK_WINDOW_MINUTES = 10;
const AD_CLICK_WINDOW_MS = AD_CLICK_WINDOW_MINUTES * 60 * 1000;

interface ClickTrackerDoc {
  timestamps: Timestamp[];
  status: 'monitoring' | 'pending_ban' | 'banned_in_ads';
}

export async function POST(request: NextRequest) {
  if (!firestoreAdmin) {
    // Fail silently if Firebase Admin is not configured.
    return NextResponse.json({ success: true, message: 'Tracking service not configured.' });
  }

  try {
    const { ip } = await request.json();

    if (!ip) {
      return NextResponse.json({ success: false, message: 'IP address is required' }, { status: 400 });
    }

    // Whitelist Google's known crawler IPs to prevent them from being flagged.
    if (ip.startsWith('66.249.')) {
        console.log(`[Ad-Tracker] Ignoring Googlebot IP: ${ip}`);
        return NextResponse.json({ success: true, message: 'Googlebot ignored' });
    }

    // Use the IP directly as the document ID. Dots are valid characters in Firestore document IDs.
    const trackerRef = firestoreAdmin.collection('ad_clicks').doc(ip);
    const now = new Date();
    const windowStart = new Date(now.getTime() - AD_CLICK_WINDOW_MS);

    await firestoreAdmin.runTransaction(async (transaction) => {
      const doc = await transaction.get(trackerRef);
      const nowTimestamp = admin.firestore.Timestamp.fromDate(now);

      if (!doc.exists) {
        // First click for this IP, start monitoring.
        const newDoc: ClickTrackerDoc = {
          timestamps: [nowTimestamp],
          status: 'monitoring',
        };
        transaction.set(trackerRef, newDoc);
        console.log(`[Ad-Tracker] First click recorded for IP: ${ip}. Status: monitoring.`);
        return;
      }

      const data = doc.data() as ClickTrackerDoc;

      // If IP is already flagged or banned, do not record more clicks.
      if (data.status === 'pending_ban' || data.status === 'banned_in_ads') {
        console.log(`[Ad-Tracker] IP ${ip} is already processed (status: ${data.status}). Ignoring click.`);
        return;
      }
      
      // Filter timestamps to only include those within the current time window
      const recentTimestamps = (data.timestamps || [])
        .map((t) => t.toDate())
        .filter((clickTime) => clickTime > windowStart);
      
      // Add the current click timestamp
      recentTimestamps.push(now);
      
      const recentClickFirestoreTimestamps = recentTimestamps.map(d => admin.firestore.Timestamp.fromDate(d));

      // Check if the click limit is reached
      if (recentTimestamps.length >= AD_CLICK_LIMIT) {
        // Flag the IP for banning via the backend Cloud Function.
        transaction.update(trackerRef, {
          timestamps: recentClickFirestoreTimestamps,
          status: 'pending_ban',
        });
        console.log(`[Ad-Tracker] IP ${ip} reached click limit. Flagged with status: pending_ban. Clicks: ${recentTimestamps.length}`);
      } else {
        // Just update the timestamps and continue monitoring.
        transaction.update(trackerRef, {
          timestamps: recentClickFirestoreTimestamps,
          status: 'monitoring', // Ensure status is set if it was missing
        });
        console.log(`[Ad-Tracker] Another click recorded for IP: ${ip}. Clicks in window: ${recentTimestamps.length}.`);
      }
    });
    
    // Always return a success response to the middleware.
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(`[Ad-Tracker-API] Error processing request:`, error);
    // Even in case of an internal error, do not block the user.
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
