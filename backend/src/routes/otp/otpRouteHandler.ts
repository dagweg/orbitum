import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../../models/user.model";

// export function otpRouteHandler() {
//   const router = express.Router();

//   /**
//    * param: {token: string}
//    */
//   router.post("/", validateToken, sendOtp);
//   return router;
// }

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    console.log("Sending EMail");
    // Query the user for available otp resends
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      res.status(404).send("User with the corresponding email was not found! ");
    }

    res.status(200).send({
      message: "OTP has been sent",
    });
    next();
  } catch (error) {
    res.status(500).send({ error });
  }
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.body.token;
    console.log("Validating Token");
    if (!token) {
      res.status(400).send("No token provided");
    }

    jwt.verify(
      token,
      process.env.TOKEN_KEY as string,
      (err: any, decoded: any) => {
        if (err) res.status(403).send("Your token is tampered or has expired");
      }
    );
    next();
  } catch (error) {
    throw new Error(error as string);
  }
}
