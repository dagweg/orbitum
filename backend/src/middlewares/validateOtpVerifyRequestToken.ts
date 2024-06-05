import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import * as jwt from "jsonwebtoken";
import { OTPVerifySchema } from "../validators/otpVerify.validation";
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

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
