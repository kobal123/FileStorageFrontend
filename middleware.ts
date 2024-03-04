import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/home') || req.nextUrl.pathname.startsWith('/api/file')) {
    
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}
