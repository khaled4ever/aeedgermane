import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin, firestoreAdmin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

// --- Configuration ---
const AD_CLICK_LIMIT = 4;
const AD_CLICK_WINDOW_MINUTES = 5;
const AD_CLICK_WINDOW_MS = AD_CLICK_WINDOW_MINUTES * 60 * 1000;

// --- Interfaces ---
interface ClickTrackerDoc {
  timestamps: Timestamp[];
  status: 'monitoring' | 'banned';
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
      
      if (data.status === 'banned') {
        console.log(`[Ad-Tracker] IP ${ip} is already flagged as banned. Ignoring new click.`);
        return; // Stop processing
      }
      
      const recentTimestamps = (data.timestamps || []).map(t => t.toDate()).filter(clickTime => clickTime > windowStart);
      recentTimestamps.push(now);
      const recentClickFirestoreTimestamps = recentTimestamps.map(d => admin.firestore.Timestamp.fromDate(d));

      if (recentTimestamps.length >= AD_CLICK_LIMIT) {
        // Limit reached. Flag the IP in Firestore for the Google Ads Script to handle.
        console.log(`[Ad-Tracker] IP ${ip} reached click limit (${recentTimestamps.length}). Flagging for script-based ban.`);
        transaction.set(trackerRef, {
          timestamps: recentClickFirestoreTimestamps,
          status: 'banned',
        });

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
