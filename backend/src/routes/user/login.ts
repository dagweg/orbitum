import { NextFunction, Request, Response } from "express";
import { ZodObject, z } from "zod";
import { UserSchema } from "../../validators/user.validation";
import { User } from "../../models/user.model";
import { Session } from "../../models/session.model";
import { generateToken } from "../../utils/token";
import { dateHoursFromNow, getHourGap } from "../../utils/date";
import jwt from "jsonwebtoken";
import { AUTH_TOKEN } from "../../apiConfig";

export const LoginSchema = z.object({
  email: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
  passWord: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
});

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

    // Check if the user is logged in already
    // If so, return an error

    let session = await Session.findOne({ email });
    const dateNow = new Date();

    // Check if the session hasnt expired
    if (session && session.expires > dateNow) {
      // Then user cannot login unless logged out first
      return res
        .status(301)
        .json({ message: "You must first sign out before signing in again." });
    }

    // If the user is not logged in, then create a session
    // and set the cookie

    const expireDuration = 24 * 3; // 3 days
    const expires: Date = dateHoursFromNow(expireDuration); // Date repr

    const sessionId = jwt.sign({ email }, process.env.TOKEN_KEY as string, {
      expiresIn: `${expireDuration}h`,
    });

    session = await Session.findOneAndUpdate(
      {
        email,
      },
      {
        $set: {
          sessionId,
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
      .cookie("sessionId", sessionId)
      .json({ message: "Successfully logged in!", sessionId });
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
