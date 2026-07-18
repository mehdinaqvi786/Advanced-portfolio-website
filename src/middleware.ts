import { NextResponse, type NextRequest } from "next/server";

import {
  updateSession,
  type SessionCookie,
} from "@/lib/supabase/middleware";
import { getSafeAdminPath } from "@/utils/auth-redirect";

const ADMIN_PREFIX = "/admin";
const LOGIN_PATH = "/login";

function hasSupabaseAuthCookie(request: NextRequest): boolean {
  return request.cookies
    .getAll()
    .some(
      (cookie) =>
        cookie.name.includes("auth-token") || cookie.name.startsWith("sb-")
    );
}

function redirectWithSessionCookies(
  url: URL,
  cookiesToSet: SessionCookie[]
): NextResponse {
  const redirectResponse = NextResponse.redirect(url);
  cookiesToSet.forEach(({ name, value, options }) => {
    redirectResponse.cookies.set(name, value, options);
  });
  return redirectResponse;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabaseResponse, user, cookiesToSet } = await updateSession(request);

  const isAdminRoute =
    pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
  const isLoginRoute = pathname === LOGIN_PATH;

  if (isAdminRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.search = "";
    loginUrl.searchParams.set("next", pathname);
    if (hasSupabaseAuthCookie(request)) {
      loginUrl.searchParams.set("toast", "session");
    }
    return redirectWithSessionCookies(loginUrl, cookiesToSet);
  }

  if (isLoginRoute && user) {
    const nextParam = request.nextUrl.searchParams.get("next");
    const destination = getSafeAdminPath(nextParam);
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = destination;
    dashboardUrl.search = "";
    return redirectWithSessionCookies(dashboardUrl, cookiesToSet);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/login", "/admin", "/admin/:path*"],
};
