import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { firestoreAdmin } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

// This is the endpoint that the Google Ads Script will call.
// It returns a plain text list of all IP addresses marked as 'banned'.
export async function GET(request: NextRequest) {
  // 1. Security Check: Validate the secret key
  const providedSecret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.BANNED_IPS_SECRET_KEY;

  if (!expectedSecret) {
    console.error("[Get-Banned-IPs] BANNED_IPS_SECRET_KEY is not set in environment variables. Endpoint is disabled.");
    return new NextResponse('Service not configured', { status: 500 });
  }

  if (providedSecret !== expectedSecret) {
    console.warn(`[Get-Banned-IPs] Unauthorized attempt to access banned IPs list.`);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Firestore Query: Fetch banned IPs
  if (!firestoreAdmin) {
    console.error("[Get-Banned-IPs] Firestore Admin not initialized. Cannot fetch IPs.");
    return new NextResponse('Service not configured (Firestore Admin)', { status: 500 });
  }

  try {
    const bannedIpsSnapshot = await firestoreAdmin
      .collection('ad_clicks')
      .where('status', '==', 'banned')
      .get();

    if (bannedIpsSnapshot.empty) {
      return new NextResponse('', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const ipList = bannedIpsSnapshot.docs.map(doc => doc.id);
    const ipText = ipList.join('\n');

    console.log(`[Get-Banned-IPs] Successfully served a list of ${ipList.length} banned IPs.`);

    return new NextResponse(ipText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error) {
    console.error("[Get-Banned-IPs] Error fetching data from Firestore:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
