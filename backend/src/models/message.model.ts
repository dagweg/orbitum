import mongoose, { InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
  },
  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audio",
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Map,
    of: Boolean,
    default: {},
  },
});

export interface MessageDocument extends InferSchemaType<typeof messageSchema> {
  views: Map<string, boolean>;
}

export const Message = mongoose.model<MessageDocument>(
  "Message",
  messageSchema
);
