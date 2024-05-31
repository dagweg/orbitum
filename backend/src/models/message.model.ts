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
  date: {
    type: Date,
    default: Date.now,
  },
});

export type MessageDocument = InferSchemaType<typeof messageSchema>;
export const Message = mongoose.model<MessageDocument>(
  "Message",
  messageSchema
);
