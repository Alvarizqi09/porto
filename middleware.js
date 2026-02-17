// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // Allow login page tanpa authentication
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Verifikasi JWT token dengan benar menggunakan getToken()
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Jika token null atau tidak valid, redirect ke login
  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    // Optional: tambahkan callbackUrl supaya bisa redirect balik setelah login
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
