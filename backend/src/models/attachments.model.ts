import mongoose, { InferSchemaType } from "mongoose";

const attachmentsSchema = new mongoose.Schema({
  type: {
    type: new Enumerator(["VIDEO", "AUDIO", "PHOTO"]),
    required: true,
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export type AttachmentDocument = InferSchemaType<typeof attachmentsSchema>;
export const Attachments = mongoose.model<AttachmentDocument>(
  "Attachments",
  attachmentsSchema
);
