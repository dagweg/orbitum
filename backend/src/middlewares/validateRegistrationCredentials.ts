import { NextFunction, Request, Response } from "express";
import { TUserSchema } from "../types/schema";
import { UserSchemaRefined } from "../validators/user.validation";

// middleware
export function validateRegistrationCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: TUserSchema = req.body;
    const validation = UserSchemaRefined.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }
    next();
  } catch (error) {
    throw new Error(error as string);
  }
}
