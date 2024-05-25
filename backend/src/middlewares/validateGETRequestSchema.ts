import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// Schema Validation Middleware GET
export const validateGETRequestSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = schema.safeParse(req.query);
      if (!validation.success) {
        return res.status(400).json(validation.error.errors);
      }
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  };
