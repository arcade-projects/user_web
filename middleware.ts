import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/admin', '/hotpotato/create', '/profile', '/lobby'];
const authRoutes = ['/login', '/verify'];

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-from-backend'
);

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const payload = await jwtVerify(token, JWT_SECRET);

    console.log('VALID TOKEN');
    console.log(payload);

    return true;
  } catch (e) {
    console.log('INVALID TOKEN');
    console.log(e);

    return false;
  }
}

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  console.log('====================');
  console.log('PATH:', pathname);
  console.log('TOKEN EXISTS:', !!token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const hasValidToken = token ? await isTokenValid(token) : false;

  console.log('PROTECTED:', isProtectedRoute);
  console.log('AUTH:', isAuthRoute);
  console.log('VALID:', hasValidToken);

  if (isProtectedRoute && !hasValidToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    if (token) {
      response.cookies.delete('token');
    }
    return response;
  }

  if (isAuthRoute && hasValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};