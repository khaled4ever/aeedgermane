import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Bypass if it's a prefetch request or not a Google Ads click
  if (
    request.headers.get('x-purpose') === 'prefetch' ||
    !request.nextUrl.searchParams.has('gclid')
  ) {
    return NextResponse.next();
  }

  // 2. Get IP address
  const ip = request.ip ?? request.headers.get('x-forwarded-for');
  if (!ip) {
    return NextResponse.next();
  }

  // 3. Fire-and-forget the tracking request to our own API route
  // This avoids delaying the user's navigation.
  const trackUrl = new URL('/api/track-click', request.url);
  fetch(trackUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ip }),
  }).catch(console.error); // Log errors but don't block

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
