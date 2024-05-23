import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";

export async function sendOtp(req: Request, res: Response) {
  try {
    console.log("THE USER IS:" + req.user);
    const { email } = req.user;

    console.log("THE EMAIL IS:" + email);
    const { otp, otpExpiry } = generateOTP();

    const user = await User.findOneAndUpdate(
      {
        email,
      },
      {
        $set: {
          otp,
          otpExpiry,
        },
      }
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
