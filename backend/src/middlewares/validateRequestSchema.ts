import { NextFunction, Request, Response } from "express";
import { SESSION_TOKEN } from "../config/apiConfig";
import { verifyJWT } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { ZodObject, ZodSchema } from "zod";

// Schema Validation Middleware
export const validateRequestSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = schema.safeParse(req.body);
      console.log(req.body);
      if (!validation.success) {
        return res.status(400).json(validation.error.errors);
      }
      next();
    } catch (error) {
      return res.status(500).json({ error, message: (error as Error).message });
    }
  };
