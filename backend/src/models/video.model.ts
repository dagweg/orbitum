import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

/**
 *
 * The Below is just a prototype for rapid testing, will be using Mongo GridFS lateron
 */

const VideosSchema = new mongoose.Schema({
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

export type VideosDocument = InferSchemaType<typeof VideosSchema>;
export const Videos = mongoose.model<VideosDocument>("Videos", VideosSchema);
