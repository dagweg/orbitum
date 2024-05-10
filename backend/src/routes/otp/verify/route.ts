import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user.model";

const schema = z.object({
  inputOtp: z.string(),
  token: z.string(),
});

export async function validateOtpVerifyRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    const body: z.infer<typeof schema> = req.body;

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

export async function verifyOTP(req: Request, res: Response) {
  try {
    type Td = {
      decoded: { email: string };
    };
    const {
      decoded: { email },
      inputOtp,
    }: z.infer<typeof schema> & Td = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Token doesn't correspond to any user. Check your token!",
      });
    }

    // Expire the otp and change user status to verified
    user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          otpExpiry: new Date(Date.now() - 1000 * 60 * 60 * 24),
          verified: true,
        },
      }
    );

    if (!user) {
      return res
        .status(500)
        .json({ message: "Problem with otp expiry & verification" });
    }

    if (user.otp === inputOtp)
      return res.status(200).json({ message: "OTP verified successfully" });

    return res.status(401).json({ message: "Incorrect OTP" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
