/* eslint-disable import/no-unused-modules */
import {NextRequest, NextResponse} from 'next/server';
import {auth} from './framework/next-auth/server';

const publicPaths = ['/', '/public'];

export default async function middleware(req: NextRequest): Promise<Response> {
  try {
    if (!publicPaths.some((path) => req.nextUrl.pathname === path)) {
      const session = await auth();
      if (!session?.user) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
      }
    }
    return NextResponse.next();
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
