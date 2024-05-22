import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../../models/user.model";
import { OTPVerifySchema } from "../../validators/otpVerify.validation";

export async function verifyOTP(req: Request, res: Response) {
  try {
    type Td = {
      decoded: { email: string };
    };
    const {
      decoded: { email },
      inputOtp,
    }: z.infer<typeof OTPVerifySchema> & Td = req.body;

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
          emailVerified: true,
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
