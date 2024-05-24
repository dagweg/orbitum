import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { User } from "../models/user.model";

export async function checkLoginStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session_token = req.cookies[SESSION_TOKEN];

    if (!session_token) {
      return res.status(401).json({ loggedIn: false });
    }

    const decoded = verifyJWT(session_token);
    if (!decoded) {
      return res.status(401).json({ loggedIn: false });
    }

    const email = (decoded as { email: string }).email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ loggedIn: false });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
}
