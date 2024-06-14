import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Session } from "../../models/session.model";
import {
  dateHoursFromNow,
  dateMillisecondsFromNow,
  dateSecondsFromNow,
} from "../../utils/date";
import * as jwt from "jsonwebtoken";
import { PRODUCTION, SESSION_TOKEN } from "../../config/apiConfig";

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    console.log("👤 USER IS");
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Please create an account.",
      });
    }

    // Check if password is incorrect
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again!" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message:
          "You must verify your account before logging in. We've sent an otp. Check your email.",
      });
    }

    const expireDuration = 60 * 60 * 24 * 3; // 3 days in seconds
    const expires: Date = dateSecondsFromNow(expireDuration);

    const sessionToken = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: `${expireDuration}`,
      }
    );

    const session = await Session.findOneAndUpdate(
      { userId: user._id }, // Use email as the unique identifier
      {
        $set: {
          sessionToken,
          expires,
          userId: user._id,
        },
      },
      { upsert: true, new: true }
    );

    console.log("🏠 SESSION IS");
    console.log(session);

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
