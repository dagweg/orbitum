import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const userSchemaValidator = z
  .object({
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
      .regex(/^\d{10}$/, { message: "Must be a valid phone number" }),
    email: z.string().regex(/^\w+@.*$/, { message: "Must be a valid email" }),
    passWord: z
      .string()
      .min(8, { message: " Password must be at least 8 characters long" })
      .regex(/^.*\d.*$/, { message: "Password must contain at least 1 number" })
      .regex(/^.*[A-Z].*$/, {
        message: "Password must contain at least 1 uppercase letter",
      })
      .regex(/^.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?\/].*$/, {
        message: "Password must contain at least 1 special character.",
      }),
    confirmPassWord: z.string(),
    profileUrl: z.string().optional(),
    settings: z.string().optional(),
    friends: z.array(z.string()).optional(),
    groupMemberships: z.array(z.string()).optional(),
    channelMemberships: z.array(z.string()).optional(),
    posts: z.array(z.string()).optional(),
    stories: z.array(z.string()).optional(),
  })
  .refine((data) => data.passWord === data.confirmPassWord, {
    message: "Passwords do not match.",
    path: ["confirmPassWord"],
  });

export type TUserSchema = z.infer<typeof userSchemaValidator>;

export function validateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Validate user middleware has run");
    const data: TUserSchema = req.body;
    const validation = userSchemaValidator.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    console.log("Middleware has passed validtion");
    next();
  } catch (error) {
    throw new Error(error as string);
  }
}
