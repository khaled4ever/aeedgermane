import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The IP blocking logic has been disabled to ensure compliance with Google Ads policies.
// The previous logic could be considered "cloaking" and poses a high risk of ad disapproval.
// The safest approach is to rely on Google's internal invalid click detection
// and/or implement a server-side API integration to add IPs to the Google Ads exclusion list.
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Config to match all paths except for specific assets and API routes.
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
