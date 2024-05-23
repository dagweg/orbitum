import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";

export function tokenRouteHandler() {
  const router = express.Router();
  router.post("/", validateToken);
  return router;
}

export async function validateToken(req: Request, res: Response) {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findOne({
      email: (decoded as { email: string }).email,
    });

    if (!user) {
      return res.status(500).json({ message: "User find query error." });
    }

    return res.status(200).json({
      message: "Token is Valid!",
      ...(decoded as {}),
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json({ error });
  }
}
