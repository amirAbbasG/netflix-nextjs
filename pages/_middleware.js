import { NextResponse } from "next/server";
// import { verifyToken } from "../lib/utils";

import jwt from "@tsndr/cloudflare-worker-jwt";

export async function middleware(req) {
  const token =
    req.cookies?.token && req.cookies?.token !== "undifind"
      ? req.cookies?.token
      : null;

  console.log(token);
  // const userId = await verifyToken(token);
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.issuer;

  const { pathname } = req.nextUrl;
  console.log({ pathname });

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
}
