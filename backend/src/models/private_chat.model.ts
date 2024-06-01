import mongoose, { InferSchemaType } from "mongoose";

const privateChatSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

export type PrivateChatDocument = InferSchemaType<typeof privateChatSchema>;
export const PrivateChat = mongoose.model<PrivateChatDocument>(
  "PrivateChat",
  privateChatSchema
);
