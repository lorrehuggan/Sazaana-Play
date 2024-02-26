import { auth, validateRequest } from './lib/auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/playlist/:path*',
  ],
};
