import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
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

    const { token } = req.body;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    decoded = decoded as { email: string };
    console.log(decoded);
    let user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Token doesn't correspond to any user. Check your token!",
      });
    }

    req.body.decoded = decoded;
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
}
