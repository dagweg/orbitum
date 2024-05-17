import { NextFunction, Request, Response } from "express";
import { ZodObject, z } from "zod";
import { UserSchema } from "../../../validators/user.validation";
import { User } from "../../../models/user.model";
import { Session } from "../../../models/session.model";
import { generateToken } from "../../../utils/token";
import { dateHoursFromNow, getHourGap } from "../../../utils/date";
import jwt from "jsonwebtoken";
import { auth_token } from "../../../apiConfig";

export async function logoutUser(req: Request, res: Response) {
  try {
    const cookie = req.cookies[auth_token];

    const decoded = jwt.verify(cookie, process.env.TOKEN_Key as string);

    if (!decoded) {
      return res.status(400).json("Invalid cookie!");
    }

    // The Cookie is a jwt so parse it to get the email

    const sess = await Session.findOneAndUpdate(
      { email: (decoded as { email: string }).email },
      {
        $set: {
          expires: new Date(Date.now() - 1000 * 60 * 60),
        },
      }
    );

    console.log(sess);

    return res.json({ message: "Successully Logged out!" });
  } catch (error) {
    return res.json({ error });
  }
}
