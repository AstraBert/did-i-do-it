import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login/signup pages
  if (sessionCookie && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/personal", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!sessionCookie && pathname.startsWith("/personal")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/personal", "/login", "/signup"], // Apply middleware to these routes
};
