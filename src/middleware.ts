import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    currentUser &&
    ![
      pathname === "/timeline",
      pathname.startsWith("/profile"),
      pathname.startsWith("/post"),
    ].some((cond) => cond)
  ) {
    return NextResponse.redirect(new URL("/timeline", request.url));
  }
  if (
    !currentUser &&
    ![pathname === "/signin", pathname === "/signup"].some((cond) => cond)
  )
    return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)",
  ],
};
