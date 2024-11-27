import mongoose, { InferSchemaType } from "mongoose";

const ImageSchema = new mongoose.Schema({
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

export type ImageDocument = InferSchemaType<typeof ImageSchema>;
export const Image = mongoose.model<ImageDocument>("Image", ImageSchema);
