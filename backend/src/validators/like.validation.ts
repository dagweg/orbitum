import { z } from "zod";

export const likeSchema = z.object({
  postId: z.string().min(1, "PostId Cannot be empty"),
});
