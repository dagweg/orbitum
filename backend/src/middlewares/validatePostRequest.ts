import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { PostSchema } from "../validators/post.validation";

// Middleware
export function validatePostRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = PostSchema.safeParse(req.body);

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
