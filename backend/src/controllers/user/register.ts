import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";
import { TUserSchema } from "../../types/schema";
import * as jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response) {
  try {
    const userData = req.body as TUserSchema;

    const { otp, otpExpiry } = generateOTP();

    const token = jwt.sign(
      { email: userData.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1800s",
      }
    );

    let user = await User.findOne({
      $or: [{ email: userData.email }, { userName: userData.userName }],
    });

    if (user) {
      const response = {
        message: "Conflict",
        verified: user.emailVerified,
        token,
      };
      if (user.email === userData.email) {
        response.message =
          "User with the specified email already exists. Please login!";
      } else if (user.userName === userData.userName) {
        response.message =
          "User with the specified username already exists. Please login!";
      }

      return res.status(409).json(response);
    }

    // Create user
    user = await User.create({
      ...userData,
      otp,
      otpExpiry,
    });

    await sendOtpEmail(userData.email, otp, otpExpiry);

    return res.status(200).json({
      message: "OTP Has been sent",
      token,
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
}
