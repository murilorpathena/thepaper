import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/admin/login"];
const ADMIN_PATHS = ["/admin/dashboard"];
const ADVERTISER_PATHS = ["/advertiser/dashboard"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const isAdminRoute = ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isAdvertiserRoute = ADVERTISER_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isAdminRoute && !isAdvertiserRoute) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get("a_session_")?.value;

  if (!sessionCookie) {
    const dest = isAdminRoute ? "/admin/login" : "/login";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/advertiser/:path*"],
};
