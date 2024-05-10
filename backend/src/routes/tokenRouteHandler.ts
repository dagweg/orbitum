import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
      process.env.TOKEN_KEY as string
    );

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    return res
      .status(200)
      .json({ message: "Token is Valid!", ...(decoded as {}) });
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json({ error });
  }
}
