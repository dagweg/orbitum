import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import {
  TUserSchema,
  userSchemaValidator,
} from "../../validators/user.validation";
import { sendMail } from "../../utils/resend";
import { generateOTP } from "../../utils/otp";
import { sendOtp, validateToken } from "../otp/otpRouteHandler";
import { sendEmail } from "../../utils/email";
import { User } from "../../models/user.model";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post("/", validateRegistrationCredentials, registerUser);

  return router;
}

// middleware
export function validateRegistrationCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: TUserSchema = req.body;
    const validation = userSchemaValidator.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    next();
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    let userData = req.body as TUserSchema;

    let { otp, otpExpiry } = generateOTP();

    const token = jwt.sign(
      { email: userData.email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "1800s",
      }
    );

    let user = await User.findOne({
      $or: [
        { email: userData.email },
        { userName: userData.userName },
        { phoneNumber: userData.phoneNumber },
      ],
    });

    if (user) {
      let response = {
        message: "",
        verified: user.verified,
        token,
      };
      if (user.email === userData.email) {
        response.message =
          "User with the specified email already exists. Please login!";
      } else if (user.userName === userData.userName) {
        response.message =
          "User with the specified username already exists. Please login!";
      } else if (user.phoneNumber === userData.phoneNumber) {
        response.message =
          "User with the specified phone number already exists. Please login!";
      }

      return res.status(409).json(response);
    }

    // Create user
    user = await User.create({
      ...userData,
      otp,
      otpExpiry,
    });

    console.log(user);

    // Send OTP
    await sendEmail(
      userData.email,
      "Account Verification OTP",
      `<p>Thanks for registering to Orbitum.<br>Here is your OTP: <strong>${otp}</strong>.<br> It is to expire after ${Math.abs(
        new Date().getHours() - otpExpiry.getHours()
      )} hours at ${otpExpiry}</p>`
    );

    return res.status(200).json({
      message: "OTP Has been sent",
      token,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).send({ error });
  }
}
