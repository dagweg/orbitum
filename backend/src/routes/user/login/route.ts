import { NextFunction, Request, Response } from "express";
import { ZodObject, z } from "zod";
import { UserSchema } from "../../../validators/user.validation";
import { User } from "../../../models/user.model";
import { Session } from "../../../models/session.model";
import { generateToken } from "../../../utils/token";
import { dateHoursFromNow, getHourGap } from "../../../utils/date";
import jwt from "jsonwebtoken";
import { auth_token } from "../../../apiConfig";

export const LoginSchema = z.object({
  email: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
  passWord: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
});

export function validateLoginCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.errors,
        message: "Input validation error",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}

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

    // Allow the user to login & also create a session and send it a payload

    // const sessionId = generateToken();

    const expireSpan = 24 * 3;
    const expires = dateHoursFromNow(expireSpan);
    const sessionId = jwt.sign({ email }, process.env.TOKEN_KEY as string, {
      expiresIn: `${expireSpan}h`,
    });

    const session = await Session.findOneAndUpdate(
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
    res.cookie(auth_token, sessionId, { expires, httpOnly: true });
    return res
      .status(200)
      .json({ message: "Successfully logged in!", sessionId });
  } catch (error) {
    return res.status(500).json({ error, message: (error as Error).message });
  }
}
