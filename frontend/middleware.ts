import { NextRequest, NextResponse } from "next/server";
import { SESSION_TOKEN } from "./app/config/constants";
import { checkLoginStatus } from "./app/actions/user";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get(SESSION_TOKEN)?.value;
  const loggedIn = sessionToken ? await checkLoginStatus(sessionToken) : false;

  // Define route access groups
  const publicRoutes = ["/", "/about", "/contact"];
  const authenticatedRoutes = [
    "/site",
    "/site/feed",
    "/site/chat",
    "/site/notifications",
    "/site/logout",
  ];
  const guestRoutes = ["/auth/register", "/auth/otp", "/auth/login"];

  if (publicRoutes.includes(pathname)) {
    // Allow all users to access public routes
    return NextResponse.next();
  }

  if (authenticatedRoutes.includes(pathname)) {
    // Redirect logged-out users trying to access authenticated routes
    if (!loggedIn) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (guestRoutes.includes(pathname)) {
    // Redirect logged-in users trying to access guest routes
    if (loggedIn) {
      return NextResponse.redirect(new URL("/site/feed", req.nextUrl.origin));
    }
    return NextResponse.next();
  }
}
