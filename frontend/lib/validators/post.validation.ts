import { z } from "zod";
import { UserSchema } from "./user.validation";
import { TUserSchema } from "../types/schema";

export const PostSchema = z.object({
  content: z.string().min(1, "Post cannot be empty"),
});

export const PostSchemaRefined = z.object({
  _id: z.string(),
  user: z.string(),
  content: z.string(),
  createdAt: z.string(),
  likes: z.array(z.string()),
  comments: z.array(z.string()),
  shares: z.array(z.string()),
  postType: z.string(),
  imageUrl: z.string(),
  videoUrl: z.string(),
  privacy: z.string(),
});
