import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { User } from "../models/user.model";
import { Session } from "../models/session.model";

export async function checkLoginStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "No session token" });
    }

    const decoded = verifyJWT(sessionToken);
    if (!decoded) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "Invalid session token" });
    }

    const { email, userId } = decoded as { email: string; userId: string };
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ loggedIn: false, message: "User not found" });
    }

    const session = await Session.findOne({ userId, sessionToken });

    if (!session || session.expires < new Date()) {
      return res.status(401).json({
        loggedIn: false,
        message: "Session has expired. Login again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
}
