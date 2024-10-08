import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

// Middleware
export function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.status(400).json({ message: "Session token cannot be empty" });
    }

    const decoded = verifyJWT(sessionToken) as JwtPayload;

    if (!decoded) {
      return res.status(400).json({ message: "Session token is not valid." });
    }

    req.user = {
      email: decoded.email,
      userId: decoded.userId,
    };
    req.body.email = decoded.email;
    req.body.userId = decoded.userId;

    // Future todo : Implement location + device identification  for better session management

    next();
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
