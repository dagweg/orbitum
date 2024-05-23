import { Request, Response } from "express";
import { User } from "../../models/user.model";

export async function verifyOTP(req: Request, res: Response) {
  try {
    const {
      user: { email },
      body: { inputOtp },
    } = req;

    if (!inputOtp) return res.status(400).json({ message: "OTP is required" });

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Token doesn't correspond to any user. Check your token!",
      });
    }

    if (user.otp === inputOtp) {
      user.otpExpiry = new Date(0);
      user.emailVerified = true;

      await user.save();
      return res
        .status(200)
        .json({ message: "OTP verified successfully. Email is now verified." });
    }

    return res.status(401).json({ message: "Incorrect OTP" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
