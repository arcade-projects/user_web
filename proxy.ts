import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/admin', '/hotpotato/create', '/profile', '/lobby'];
const authRoutes = ['/login', '/verify'];

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-from-backend'
);

async function isTokenValid(token: string): Promise<true | string> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (e: any) {
    return `${e.constructor.name}: ${e.message}`;
  }
}

export default async function proxy(request: NextRequest) {

return Response.json({
  envs: Object.keys(process.env)
    .filter((k) => k.includes("JWT") || k.includes("SECRET"))
    .sort(),
});

  // const { pathname } = request.nextUrl;
  // const token = request.cookies.get('token')?.value;

  // console.log('====================');
  // console.log('PATH:', pathname);
  // console.log('TOKEN EXISTS:', !!token);

  // const isProtectedRoute = protectedRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // const result = token ? await isTokenValid(token) : false;

  // console.log('PROTECTED:', isProtectedRoute);
  // console.log('AUTH:', isAuthRoute);
  // console.log('VALID:', result);

  // if (isProtectedRoute && result !== true) {
  //   return NextResponse.redirect(
  //     new URL(`/login?error=${encodeURIComponent(String(result))}`, request.url)
  //   );
  // }

  // if (isAuthRoute && result === true) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};