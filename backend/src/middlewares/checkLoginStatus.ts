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
      return res.status(401).json({ loggedIn: false });
    }

    const decoded = verifyJWT(sessionToken);
    if (!decoded) {
      return res.status(401).json({ loggedIn: false });
    }

    const email = (decoded as { email: string }).email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ loggedIn: false });
    }

    const session = await Session.findOne({ email, sessionToken });

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