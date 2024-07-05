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
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: " Password must be at least 8 characters long" })
    .regex(/^.*\d+.*$/, {
      message: "Password must contain at least 1 number",
    })
    .regex(/^.*[A-Z]+.*$/, {
      message: "Password must contain at least 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/, {
      message: "Password must contain at least 1 special character.",
    }),
  confirmPassWord: z.string(),
  otp: z.string().optional(),
  otpExpiry: z.date().optional(),
  profilePicture: z.string().optional(),
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

export const GetUserSchema = z.object({
  userId: z.string().min(1, "Cannot be empty"),
});
