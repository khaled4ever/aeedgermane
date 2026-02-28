import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

// The middleware now accepts 'event' as a second argument.
export function middleware(request: NextRequest, event: NextFetchEvent) {
  // A test parameter to allow developers to simulate an ad click
  const isTestClick = request.nextUrl.searchParams.has('test_ad_click');
  // A real ad click will have a gclid
  const isAdClick = request.nextUrl.searchParams.has('gclid');
  // Vercel and Next.js prefetch pages, which we want to ignore
  const isPrefetch = request.headers.get('x-purpose') === 'prefetch';

  // 1. If it's not a real ad click, not a test click, or if it's a prefetch, do nothing.
  if ((!isAdClick && !isTestClick) || isPrefetch) {
    return NextResponse.next();
  }

  // 2. Get IP address
  const ip = request.ip ?? request.headers.get('x-forwarded-for');
  if (!ip) {
    console.log("[Ad-Tracker-Middleware] Could not determine IP address. Aborting tracking for this request.");
    return NextResponse.next();
  }
  
  console.log(`[Ad-Tracker-Middleware] Ad click detected! IP: ${ip}. URL: ${request.nextUrl.href}`);
  console.log("[Ad-Tracker-Middleware] Firing tracking request to /api/track-click...");
  
  // 3. Fire the tracking request and tell Vercel to wait for it to finish.
  // This is the crucial change. event.waitUntil() prevents the middleware from
  // terminating before our background fetch request is complete.
  const trackUrl = new URL('/api/track-click', request.url);
  
  event.waitUntil(
    fetch(trackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    })
    .then(response => {
        if (!response.ok) {
            console.error(`[Ad-Tracker-Middleware] Tracking request failed with status: ${response.status}`);
        } else {
            console.log("[Ad-Tracker-Middleware] Tracking request sent successfully.");
        }
    })
    .catch(err => {
        console.error("[Ad-Tracker-Middleware] CRITICAL: Error firing tracking request:", err);
    })
  );

  // 4. IMPORTANT: Always allow the request to proceed immediately.
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
