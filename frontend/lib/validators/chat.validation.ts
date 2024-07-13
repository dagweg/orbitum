import { z } from "zod";
import { TUserSchema } from "@/lib/types/schema";
import { AudioSchema } from "./audio.validation";
import { TAudio } from "@/app/types";

export const MessageSchema = z.object({
  sender: z.object({
    userName: z.string(),
  }),
  content: z.object({}),
  audio: AudioSchema,
  date: z.date().optional(),
  you: z.boolean(),
});

export type TMessage = {
  sender: {
    username: string;
  };
  content: object;
  audio: TAudio;
  date: Date;
  you: boolean;
};
