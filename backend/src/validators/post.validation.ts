import { z } from "zod";

export const PostSchema = z.object({
  email: z.string(),
  content: z.string().min(1, "Post cannot be empty"),
});
