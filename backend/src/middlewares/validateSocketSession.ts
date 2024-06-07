import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import parseCookie from "../utils/cookie";

// Middleware
export function validateSocketSession(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const cookieHeader = socket.handshake.headers.cookie;

  if (!cookieHeader) {
    return next(new Error("Cookie header cannot be empty"));
  }

  let sessionToken = parseCookie(cookieHeader)[SESSION_TOKEN];

  // console.log("SESSION TOKEN inside SOCKET.IO ", sessionToken);

  if (!sessionToken) {
    return next(new Error("Session token cannot be empty"));
  }

  const decoded = verifyJWT(sessionToken) as JwtPayload;

  if (!decoded) {
    return next(new Error("Session token is not valid."));
  }

  socket.data.user = {
    email: decoded.email,
    userId: decoded.userId,
  };

  next();
}
