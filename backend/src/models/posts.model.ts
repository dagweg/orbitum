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
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
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
      ref: "Images",
    },
  ],
  videos: [
    {
      type: ObjectId,
      ref: "PostVideos",
    },
  ],
  privacy: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public",
  },
});

export type TPosts = InferSchemaType<typeof postsSchema>;
export const Posts = mongoose.model<TPosts>("Posts", postsSchema);
