import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin/dashboard", "/admin/dashboard/"];
const ADMIN_LOGIN = "/admin/login";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || !pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get("a_session_")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};