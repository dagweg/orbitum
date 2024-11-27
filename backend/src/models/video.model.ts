import mongoose, { InferSchemaType } from "mongoose";


/**
 *
 * The Below is just a prototype for rapid testing, will be using Mongo GridFS lateron
 */

const VideoSchema = new mongoose.Schema({
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

export type VideoDocument = InferSchemaType<typeof VideoSchema>;
export const Video = mongoose.model<VideoDocument>("Video", VideoSchema);
