import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const userSchemaValdiator = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Must be a valid phone number" })
    .optional(),
  profileUrl: z.string().optional(),
  settings: z.string().optional(),
  friends: z.array(z.string()).optional(),
  groupMemberships: z.array(z.string()).optional(),
  channelMemberships: z.array(z.string()).optional(),
  posts: z.array(z.string()).optional(),
  stories: z.array(z.string()).optional(),
});

export const validate_user =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = userSchemaValdiator.safeParse(req);
      if (!validation.success) {
        return res.status(400).json({ errors: validation.error.errors });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
