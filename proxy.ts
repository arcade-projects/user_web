import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/admin', '/hotpotato/create', '/profile', '/lobby'];
const authRoutes = ['/login', '/verify'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

async function isTokenValid(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  const hasValidToken = token ? await isTokenValid(token) : false;

  if (isProtectedRoute && !hasValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};