import mongoose, { InferSchemaType } from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  audios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audio",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

export type AttachmentDocument = InferSchemaType<typeof AttachmentSchema>;
export const Attachment = mongoose.model<AttachmentDocument>(
  "Attachment",
  AttachmentSchema
);
