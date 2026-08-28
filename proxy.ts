import { type NextRequest, NextResponse } from "next/server";

import { authFromCookieOptions, isStudioPath } from "@/lib/auth";
import { routes } from "@/lib/routes";
import { AUTH_FROM_COOKIE, SESSION_COOKIE } from "@/session/constants";

export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  if (isStudioPath(pathname) && !hasSession) {
    const response = NextResponse.redirect(new URL(routes.login, request.url));
    response.cookies.set(AUTH_FROM_COOKIE, pathname, authFromCookieOptions());
    return response;
  }

  if (pathname === routes.login && hasSession) {
    return NextResponse.redirect(new URL(routes.studio, request.url));
  }
}

export const config = {
  matcher: ["/studio/:path*", "/login"],
};
