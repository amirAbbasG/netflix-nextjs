import { NextResponse } from "next/server";

import jwt from "@tsndr/cloudflare-worker-jwt";

export async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  console.log(token);
  const isValid = await jwt.verify(token, process.env.JWT_SECRET);
  // Check for validity
  if (!isValid) {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.issuer;

    const { pathname } = req.nextUrl;

    if (
      pathname.includes("/api/login") ||
      userId ||
      pathname.includes("/static")
    ) {
      return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.rewrite(url);
    }
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
}
