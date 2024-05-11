// import { protectedRoutes } from "@/middleware";
// import { NextRequest, NextResponse } from "next/server";

// export default function otpPageMiddleware(req: NextRequest, res: NextResponse) {
//   if (protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteUrl = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteUrl.toString());
//   }
// }
