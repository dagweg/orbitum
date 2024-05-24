import { NextFunction, Request, Response } from "express";
import { ZodObject, z } from "zod";
import { UserSchema } from "../../validators/user.validation";
import { User } from "../../models/user.model";
import { Session } from "../../models/session.model";
import { generateToken } from "../../utils/token";
import { dateHoursFromNow, getHourGap } from "../../utils/date";
import jwt from "jsonwebtoken";
import { SESSION_TOKEN } from "../../config/apiConfig";
import { verifyJWT } from "../../utils/jwt";

export async function logoutUser(req: Request, res: Response) {
  try {
    // Check for the session id that comes as sessionToken
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) {
      return res.status(400).json({ message: "Already logged out." });
    }

    // Verify the validity of the session id
    const decoded = verifyJWT(sessionToken);

    if (!decoded) {
      return res.status(400).json("Invalid sessionToken!");
    }

    // The sessionToken is a jwt so parse it to get the email
    const sess = await Session.findOneAndUpdate(
      { email: (decoded as { email: string }).email },
      {
        $set: {
          expires: new Date(0),
        },
      }
    );

    return res.json({ message: "Successully Logged out!" });
  } catch (error) {
    return res.json({ error });
  }
}
