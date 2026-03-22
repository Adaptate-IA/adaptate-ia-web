import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/py/')) {
    // Block the proxy entirely if no backend is configured
    if (!process.env.BACKEND_URL) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Forward an internal secret so the Python backend can verify the request
    // comes from this Next.js server and not from an external caller.
    // Set INTERNAL_API_KEY in both Next.js and your Python backend.
    const secret = process.env.INTERNAL_API_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Not configured' }, { status: 503 });
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-internal-secret', secret);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/py/:path*',
};
