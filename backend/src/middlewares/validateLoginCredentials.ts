import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../routes/user/login";

// Middleware
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
