import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import {
  TUserSchema,
  userSchemaValidator,
} from "../../validators/user.validation";
import { sendMail } from "../../utils/resend";
import { generateOTP } from "../../utils/otp";

export default function userRouteHandler(): Router {
  const router = express.Router();

  router
    .get("/", (req, res) => {
      res.send("hi");
    })
    .post("/", validateRegistrationCredentials, registerUser);

  return router;
}

export async function registerUser(req: Request, res: Response) {
  try {
    let userData = req.body as TUserSchema;
    let { otp, otpExpiry } = generateOTP();

    console.log(otp + " and " + otpExpiry);

    const token = jwt.sign(
      { email: userData.email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "1800s",
      }
    );
    res.status(200).json({
      message: "OTP Has been sent",
      token,
    });
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
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
