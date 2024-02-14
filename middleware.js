import { NextResponse } from 'next/server';
import { getSession, updateSession } from '@/utils/session';

export const config = {
  matcher: ["/user/:path*", "/"]
}

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const session = await getSession();
  if (path === "/") {
    if (session) {
      const response = updateSession(session);
      return response.redirect(new URL("/user/dashboard", request.url));
    }
  }

  if (path.includes("user")) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return updateSession(session);
  }
}