import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Public routes (attendance pages)
  if (request.nextUrl.pathname.startsWith("/t/")) {
    return NextResponse.next();
  }

  // Admin routes require authentication
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // API routes (except public attendance API)
  if (request.nextUrl.pathname.startsWith("/api")) {
    if (request.nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/api/attendance")) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
