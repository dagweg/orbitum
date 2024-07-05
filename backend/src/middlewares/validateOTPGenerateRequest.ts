import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/user.model";
import { verifyJWT } from "../utils/jwt";
/**
 *
 * @param req {token}
 * @param res
 * @param next
 * @returns
 */
export async function validateOTPGenerateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const schema = z.object({
      token: z.string(),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { token } = validation.data;
    const decoded = verifyJWT(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { email, userId } = decoded as { email: string; userId: string };

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Token doesn't correspond to any user. Check your token!",
      });
    }

    req.user = { email, userId };
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
}
