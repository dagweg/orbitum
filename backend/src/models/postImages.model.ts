import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const postImagesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  base64: {
    type: String,
    required: true,
  },
});

export type PostImagesDocument = InferSchemaType<typeof postImagesSchema>;
export const PostImages = mongoose.model<PostImagesDocument>(
  "PostImages",
  postImagesSchema
);
