import { NextResponse } from 'next/server';

export default function middleware(request) {
  // console.log(request);
  // console.log("middleware");
}

export const config = {
  matcher: '/',
}