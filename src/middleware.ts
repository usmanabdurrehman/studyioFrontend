import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PATH } from "./constants";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    currentUser &&
    ![
      pathname === PATH.TIMELINE,
      pathname.startsWith(PATH.PROFILE),
      pathname.startsWith(PATH.POST),
    ].some((cond) => cond)
  ) {
    return NextResponse.redirect(new URL(PATH.TIMELINE, request.url));
  }
  if (
    !currentUser &&
    ![pathname === PATH.SIGNIN, pathname === PATH.SIGNUP].some((cond) => cond)
  )
    return NextResponse.redirect(new URL(PATH.SIGNIN, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)",
  ],
};
