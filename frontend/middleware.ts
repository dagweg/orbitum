import { NextRequest, NextResponse } from "next/server";
import { SESSION_TOKEN } from "./app/config/constants";
import { checkLoginStatus } from "./app/actions/user";
import { CLIENT_ORIGIN } from "./app/config/apiConfig";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get(SESSION_TOKEN)?.value;

  const loggedIn = await checkLoginStatus(sessionToken as string);

  if (logoutRequiringRoutes.includes(pathname) && loggedIn) {
    return NextResponse.redirect(new URL("/site/feed", CLIENT_ORIGIN));
  }
  if (loginRequiringRoutes.includes(pathname) && !loggedIn) {
    return NextResponse.redirect(new URL("/auth/login", CLIENT_ORIGIN));
  }

  return NextResponse.next();
}

const loginRequiringRoutes = [
  "/site",
  "/site/feed",
  "/site/chat",
  "/site/notifications",
  "/site/logout",
];

const logoutRequiringRoutes = ["/auth/register", "/auth/otp", "auth/login"];
