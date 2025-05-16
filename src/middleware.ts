import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth_token");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignupPage = request.nextUrl.pathname === "/signup";
  const isRootPage = request.nextUrl.pathname === "/";
  const isAuthPage = isLoginPage || isSignupPage;

  // If trying to access protected routes without auth, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated user tries to access login/signup page, redirect to dashboard
  if (isAuthenticated && (isAuthPage || isRootPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}; 