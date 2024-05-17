import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import { UserSchemaRefined } from "../../validators/user.validation";
import { TUserSchema } from "../../validators/types";
import { sendOtpEmail } from "../../utils/email";
import { generateOTP } from "../../utils/otp";
import { sendEmail } from "../../utils/email";
import { User } from "../../models/user.model";
import { loginUser, validateLoginCredentials } from "./login/route";
import { logoutUser } from "./logout/route";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("hi");
  });

  router.post("/", validateRegistrationCredentials, registerUser);

  router.post("/login", validateLoginCredentials, loginUser);

  router.post("/logout", logoutUser);

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
    const validation = UserSchemaRefined.safeParse(data);
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
        verified: user.emailVerified,
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

    await sendOtpEmail(userData.email, otp, otpExpiry);

    return res.status(200).json({
      message: "OTP Has been sent",
      token,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).send({ error });
  }
}
