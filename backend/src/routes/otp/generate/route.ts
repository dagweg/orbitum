import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "../../../models/user.model";
import { sendOtpEmail } from "../../../utils/email";
import { generateOTP } from "../../../utils/otp";
import jwt from "jsonwebtoken";

/**
 *
 * @param req {token, email}
 * @param res
 * @param next
 * @returns
 */
export async function validateOTPGenerateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = z.object({
      token: z.string(),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { token } = req.body;
    let decoded = jwt.verify(token, process.env.TOKEN_KEY as string);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    decoded = decoded as { email: string };
    console.log(decoded);
    let user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Token doesn't correspond to any user. Check your token!",
      });
    }

    req.body.decoded = decoded;
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
}

export async function sendOtp(req: Request, res: Response) {
  try {
    const { email } = req.body.decoded;

    const { otp, otpExpiry } = generateOTP();

    const user = await User.findOneAndUpdate(
      {
        email,
      },
      {
        otp,
        otpExpiry,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    console.log(user);

    await sendOtpEmail(email, otp, otpExpiry);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ error, message: (error as Error).message });
  }
}
