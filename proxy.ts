import { NextRequest, NextResponse } from 'next/server';
import { adminSessionKey, getSession, userSessionKey } from '@/server/lib/auth';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const userSession = await getSession(userSessionKey);
  const adminSession = await getSession(adminSessionKey);

  const isUser = request.nextUrl.pathname.startsWith('/user');
  const isAdmin = request.nextUrl.pathname.startsWith('/admin');

  if (!userSession && isUser) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!adminSession && isAdmin) {
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
  //   return await updateSession(request);
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
