import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt";
import { TOTPVerifySchema } from "../types/schema";

export async function validateOtpVerifyRequestToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body: TOTPVerifySchema = req.body;

    const decoded = verifyJWT(body.token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token. Unauthorized." });
    }
    const { email, userId } = decoded as { email: string; userId: string };

    req.user = {
      email,
      userId,
    };
    next();
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
