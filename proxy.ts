import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/admin',
  '/hotpotato/create',
  '/profile',
  '/lobby',
];

const authRoutes = [
  '/login',
  '/verify',
];

async function isAuthenticated(cookie: string | null): Promise<boolean> {
  if (!cookie) {
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          cookie,
        },
        cache: 'no-store',
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const cookie = request.headers.get('cookie');

  const authenticated = await isAuthenticated(cookie);

  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && authenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};