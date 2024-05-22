import { ObjectId } from "mongodb";
import mongoose from "mongoose";

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
  postType: {
    type: String,
    enum: ["text", "image", "video"],
    default: "text",
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  privacy: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public",
  },
});

export const Posts = mongoose.model("Posts", postsSchema);
