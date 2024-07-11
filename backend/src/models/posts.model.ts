import { ObjectId } from "mongodb";
import mongoose, { InferSchemaType } from "mongoose";

const postsSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Map,
    of: Boolean,
    default: new Map(),
  },
  comments: [
    {
      type: ObjectId,
      ref: "Comments",
    },
  ],
  shares: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  images: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  videos: [
    {
      type: ObjectId,
      ref: "Video",
    },
  ],
  privacy: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public",
  },
});

export interface TPosts extends InferSchemaType<typeof postsSchema> {
  likes: Map<string, boolean>;
}
export const Posts = mongoose.model<TPosts>("Posts", postsSchema);
