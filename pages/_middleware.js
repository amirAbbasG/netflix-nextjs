import { NextResponse } from "next/server";
// import { verifyToken } from "../lib/utils";

import jwt from "@tsndr/cloudflare-worker-jwt";

export async function middleware(req) {
  const token =
    req.cookies?.token && req.cookies?.token !== "undifind"
      ? req.cookies?.token
      : null;

  if ((!token || token === null) && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  } else {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.issuer;

    const { pathname } = req.nextUrl;

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
