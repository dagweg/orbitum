import { NextFunction, Request, Response } from "express";
import { ZodObject, z } from "zod";
import { UserSchema } from "../../validators/user.validation";
import { User } from "../../models/user.model";
import { Session } from "../../models/session.model";
import { generateToken } from "../../utils/token";
import { dateHoursFromNow, getHourGap } from "../../utils/date";
import jwt from "jsonwebtoken";
import { PRODUCTION, SESSION_TOKEN } from "../../config/apiConfig";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, passWord } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message:
          "User with the specified email doesn't exist. Please register.",
      });
    }

    // Check if password is correct
    if (user.passWord !== passWord) {
      return res
        .status(401)
        .json({ message: "Password is incorrect. Please try again!" });
    }

    // If the user is not logged in, then create a session
    // and set the cookie

    const expireDuration = 24 * 3; // 3 days
    const expires: Date = dateHoursFromNow(expireDuration); // Date repr

    const sessionToken = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: `${expireDuration}h`,
      }
    );

    const session = await Session.findOneAndUpdate(
      {
        email,
      },
      {
        $set: {
          sessionId: sessionToken,
          expires,
        },
      },
      { upsert: true }
    );

    if (!session) {
      return res.status(500).json({ message: "Session creation failed!" });
    }

    return res
      .status(200)
      .cookie(SESSION_TOKEN, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
      })
      .json({ message: "Successfully logged in!" });
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
