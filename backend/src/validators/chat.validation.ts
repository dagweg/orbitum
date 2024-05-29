import { z } from "zod";

export const GetPrivateChatSchema = z.object({
  userId: z.string().min(1, "User Id cannot be empty"),
});
