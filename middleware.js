import { NextResponse } from 'next/server';
import { getSession, updateSession } from '@/utils/session';

export const config = {
  matcher: ["/user/:path*", "/", "/sign-up", "/login"]
}

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const session = await getSession();

  if (path === "/" || path === "/sign-up" || path === "/login") {
    if (session) {
      const redirectUrl = new URL("/user/dashboard", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (path.includes("user")) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return await updateSession(session);
  }
}