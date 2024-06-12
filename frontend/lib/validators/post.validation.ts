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
  liked: z.boolean().optional(),
  comments: z.array(z.string()),
  shares: z.array(z.string()),
  postType: z.string(),
  images: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      dataBase64: z.string(),
      url: z.string(),
    })
  ),
  videos: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      url: z.string(),
    })
  ),
  privacy: z.string(),
});
