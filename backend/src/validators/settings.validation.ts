import { z } from "zod";

export const ProfilePicSchema = z.object({
  name: z.string(),
  type: z.string().refine((val) => val.trim().length > 0, {
    message: "Cannot be empty",
  }),
  base64: z.string().refine((val) => val.trim().length > 0, {
    message: "Cannot be empty",
  }),
});
