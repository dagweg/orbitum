import { z } from "zod";
import { TUserSchema } from "@/lib/types/schema";
import { AudioSchema } from "./audio.validation";

export const MessageSchema = z.object({
  sender: z.object({
    userName: z.string(),
  }),
  content: z.object({}),
  audio: AudioSchema,
  date: z.date().optional(),
  you: z.boolean(),
});
