import { z } from "zod";

// User Id below refers to the person on the other end of the chat
export const GetPrivateChatSchema = z.object({
  userId: z.string().min(1, "User Id cannot be empty"),
});

export const ViewMessageSchema = z.object({
  messageId: z.string().refine((val) => val.trim().length > 0, {
    message: "Message id can't be empty",
  }),
});
