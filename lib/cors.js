import { NextResponse } from "next/server";

export function setCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

export function handleCorsOptions(request) {
  if (request.method === "OPTIONS") {
    return setCorsHeaders(new NextResponse(null, { status: 200 }));
  }
  return null;
}
