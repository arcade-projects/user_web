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
      nodeEnv: process.env.NODE_ENV,
      jwtExists: !!process.env.JWT_SECRET,
      jwtLength: process.env.JWT_SECRET?.length ?? 0,
  });


}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};