import mongoose, { InferSchemaType } from "mongoose";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  base64: {
    type: String,
    required: true,
  },
});

export type TFileDocument = InferSchemaType<typeof fileSchema>;
export const FileModel = mongoose.model<TFileDocument>("File", fileSchema);
