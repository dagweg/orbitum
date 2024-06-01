import { z } from "zod";
import { TUserSchema } from "@/lib/types/schema";

export const MessageSchema = z.object({
  sender: z.object({
    userName: z.string(),
  }),
  content: z.object({}),
  date: z.date().optional(),
  you: z.boolean(),
});
