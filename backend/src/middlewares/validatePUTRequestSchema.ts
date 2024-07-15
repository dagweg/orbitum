import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// Schema Validation Middleware PUT
export const validatePUTRequestSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("received ", req.body);
      const validation = schema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json(validation.error.errors);
      }
      next();
    } catch (error) {
      return res.status(500).json({ error, message: (error as Error).message });
    }
  };
