import { NextResponse } from "next/server";
// import { verifyToken } from "../lib/utils";

import jwt from "@tsndr/cloudflare-worker-jwt";

export async function middleware(req) {
  const token =
    req.cookies?.token && req.cookies?.token !== "undifind"
      ? req.cookies?.token
      : null;

  const { pathname } = req.nextUrl;

  if ((!token || token === null) && pathname !== "/login") {
    if (pathname.includes("/api/login") || pathname.includes("/static")) {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  } else {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.issuer;

    if (
      pathname.includes("/api/login") ||
      userId ||
      pathname.includes("/static")
    ) {
      return NextResponse.next();
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }
  }
}
