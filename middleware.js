import { NextResponse } from "next/server";

export function middleware(req) {
  // Allow login page tanpa authentication
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Untuk semua route /admin lain, check JWT token
  // NextAuth JWT disimpan di cookie: next-auth.session-token (development) atau __Secure-next-auth.session-token (production)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
