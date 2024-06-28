import mongoose, { InferSchemaType } from "mongoose";
import { send } from "process";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Audio",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export type MessageDocument = InferSchemaType<typeof messageSchema>;
export const Message = mongoose.model<MessageDocument>(
  "Message",
  messageSchema
);
