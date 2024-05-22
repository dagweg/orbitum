import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { OTPVerifySchema } from "../validators/otpVerify.validation";

export async function validateOtpVerifyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = OTPVerifySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const body: z.infer<typeof OTPVerifySchema> = req.body;

    const decoded = jwt.verify(body.token, process.env.TOKEN_KEY as string);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token. Unauthorized." });
    }

    req.body.decoded = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
