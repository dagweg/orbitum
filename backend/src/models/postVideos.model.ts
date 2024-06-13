import mongoose, { Schema } from "mongoose";
import { InferSchemaType } from "mongoose";

/**
 *
 * The Below is just a prototype for rapid testing, will be using Mongo GridFS lateron
 */

const postVideosSchema = new mongoose.Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  dataBase64: {
    type: String,
    required: true,
  },
});

export type PostVideosDocument = InferSchemaType<typeof postVideosSchema>;
export const PostVideos = mongoose.model<PostVideosDocument>(
  "PostVideos",
  postVideosSchema
);
