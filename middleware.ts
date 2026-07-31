import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/admin', '/hotpotato/create', '/profile', '/lobby'];
const authRoutes = ['/login', '/verify'];

// SECRET_KEY باید دقیقاً همون راز JWT باشه که توی NestJS گذاشتی (مثلاً از env)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-from-backend'
);

async function isTokenValid(token: string): Promise<boolean> {
  try {
    // امضا و انقضای توکن بررسی می‌شود
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    // اگر توکن دستکاری شده باشه یا تاریخش گذشته باشه ارور میده
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // اگر توکن وجود داشت، معتبر بودنش رو چک کن
  const hasValidToken = token ? await isTokenValid(token) : false;

  // ۱. سعی می‌کنه بره صفحات محافظت‌شده ولی توکن معتبر نداره
  if (isProtectedRoute && !hasValidToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    // کوکی نامعتبر/دستکاری شده رو پاک کن
    if (token) {
      response.cookies.delete('token');
    }
    return response;
  }

  // ۲. توکن معتبر داره و می‌خواد بره صفحه لاگین
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