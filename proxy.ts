import { jwtVerify } from 'jose';
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
const token = request.cookies.get('token')?.value;

if (token) {
  try {
    const result = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return Response.json({
      ok: true,
      payload: result.payload,
    });
  } catch (e: any) {
    return Response.json({
      ok: false,
      error: e.constructor.name,
      message: e.message,
    });
  }
}

return Response.json({
  token: false,
});
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};