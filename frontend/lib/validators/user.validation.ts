import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const UserSchema = z.object({
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
    .regex(/^\+\d{12}$/, {
      message: "Must be a valid phone number",
    })
    .optional(),
  email: z
    .string()
    .regex(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      { message: "Must be a valid email" }
    ),
  password: z
    .string()
    .min(8, { message: " Password must be at least 8 characters long" })
    .regex(/^.*\d+.*$/, {
      message: "Password must contain at least 1 number",
    })
    .regex(/^.*[A-Z]+.*$/, {
      message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/^.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?\/].*$/, {
      message: "Password must contain at least 1 special character.",
    }),
  confirmPassWord: z.string(),
  otp: z.string().optional(),
  otpExpiry: z.date().optional(),
  profileUrl: z.string().optional(),
  settings: z.string().optional(),
  friends: z.array(z.string()).optional(),
  groupMemberships: z.array(z.string()).optional(),
  channelMemberships: z.array(z.string()).optional(),
  posts: z.array(z.string()).optional(),
  stories: z.array(z.string()).optional(),
});

export const UserSchemaRefined = UserSchema.refine(
  (data) => data.password === data.confirmPassWord,
  {
    message: "Passwords do not match.",
    path: ["confirmPassWord"],
  }
);
