import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
  passWord: z
    .string()
    .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
});
