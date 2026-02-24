import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { admin, firestoreAdmin } from '@/lib/firebase-admin';
import type { Timestamp } from 'firebase-admin/firestore';

const AD_CLICK_LIMIT = 4; // 4 clicks
const AD_CLICK_WINDOW_MINUTES = 10;
const AD_CLICK_WINDOW_MS = AD_CLICK_WINDOW_MINUTES * 60 * 1000;

interface ClickTrackerDoc {
  clicks: Timestamp[];
  status: 'monitoring' | 'pending_ban' | 'banned_in_ads';
  lastUpdated: Timestamp;
}

export async function middleware(request: NextRequest) {
  // 1. Bypass if Firebase isn't configured or if it's a prefetch request
  if (!firestoreAdmin) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Firebase Admin is not configured, skipping ad click tracking.');
    }
    return NextResponse.next();
  }
  if (request.headers.get('x-purpose') === 'prefetch') {
    return NextResponse.next();
  }

  // 2. Only act on requests that are from Google Ads
  if (!request.nextUrl.searchParams.has('gclid')) {
    return NextResponse.next();
  }

  // 3. Get IP address
  const ip = request.ip ?? request.headers.get('x-forwarded-for');
  if (!ip) {
    return NextResponse.next();
  }

  // 4. Run the tracking logic in a transaction
  try {
    const trackerRef = firestoreAdmin.collection('ad_clicks_tracker').doc(ip);
    const now = new Date();
    const windowStart = new Date(now.getTime() - AD_CLICK_WINDOW_MS);

    await firestoreAdmin.runTransaction(async (transaction) => {
      const doc = await transaction.get(trackerRef);
      const nowTimestamp = admin.firestore.Timestamp.fromDate(now);

      if (!doc.exists) {
        // First click for this IP
        const newDoc: ClickTrackerDoc = {
          clicks: [nowTimestamp],
          status: 'monitoring',
          lastUpdated: nowTimestamp,
        };
        transaction.set(trackerRef, newDoc);
        return;
      }

      const data = doc.data() as ClickTrackerDoc;

      // If status is already pending_ban or banned_in_ads, do nothing.
      // The Cloud Function is responsible for handling it from here.
      if (data.status === 'pending_ban' || data.status === 'banned_in_ads') {
        return;
      }

      const recentClicks = data.clicks
        .map((t) => t.toDate())
        .filter((clickTime) => clickTime > windowStart);
      
      recentClicks.push(now);
      const recentClickTimestamps = recentClicks.map(d => admin.firestore.Timestamp.fromDate(d));

      if (recentClicks.length >= AD_CLICK_LIMIT) {
        // Threshold reached. Mark for banning by the Cloud Function.
        transaction.update(trackerRef, {
          clicks: recentClickTimestamps,
          status: 'pending_ban',
          lastUpdated: nowTimestamp,
        });
      } else {
        // Threshold not reached, just update the clicks.
        transaction.update(trackerRef, {
          clicks: recentClickTimestamps,
          lastUpdated: nowTimestamp,
        });
      }
    });

  } catch (error) {
    console.error(`[Ad-Tracker-Middleware] Error processing IP ${ip}:`, error);
  }

  // 5. IMPORTANT: Always allow the request to proceed.
  // The middleware only tracks, it does not block.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any file with an extension (e.g., .svg, .png, .jpg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
