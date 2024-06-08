import { z } from "zod";

export const CommentsPostSchema = z.object({
  postId: z.string().refine((elem) => elem.trim().length > 0, {
    message: "Postid Cannot be empty",
  }),
  comment: z.string().refine((elem) => elem.trim().length > 0, {
    message: "Post Comment Cannot be empty",
  }),
});
