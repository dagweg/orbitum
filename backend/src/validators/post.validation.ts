import { z } from "zod";

export const PostSchema = z.object({
  content: z.string().refine((val) => val.trim().length > 0, {
    message: "Say something, post cant be empty",
  }),
  images: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().refine((val) => val.trim().length > 0, {
          message: "Cannot be empty",
        }),
        base64: z.string().refine((val) => val.trim().length > 0, {
          message: "Cannot be empty",
        }),
      })
    )
    .optional(),
  videos: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().refine((val) => val.trim().length > 0, {
          message: "Cannot be empty",
        }),
        base64: z.string().refine((val) => val.trim().length > 0, {
          message: "Cannot be empty",
        }),
      })
    )
    .optional(),
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
      base64: z.string(),
      url: z.string(),
    })
  ),
  videos: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      url: z.string(),
      base64: z.string(),
    })
  ),
  privacy: z.string(),
});
