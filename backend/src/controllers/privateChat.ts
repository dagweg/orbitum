import mongoose from "mongoose";
import { PrivateChat as PrivateChatModel } from "../models/private_chat.model";

export class PrivateChat {
  constructor() {}

  async createPrivateChat(
    user1: mongoose.Types.ObjectId,
    user2: mongoose.Types.ObjectId
  ): Promise<{ chat?: Object; error?: Error }> {
    try {
      const chat = await PrivateChatModel.create({
        user1,
        user2,
      });
      return { chat };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async privateChatMessagePush(
    user1: mongoose.Types.ObjectId,
    user2: mongoose.Types.ObjectId,
    message: mongoose.Types.ObjectId
  ): Promise<{ privateChat?: Object; error?: Error }> {
    try {
      let chat = await PrivateChatModel.findOneAndUpdate(
        {
          $or: [
            { user1, user2 },
            { user1: user2, user2: user1 },
          ],
        },
        { $push: { messages: message } },
        { new: true }
      );
      if (!chat) {
        const newchat = await PrivateChatModel.create({
          user1,
          user2,
          messages: [message],
        });

        return { privateChat: newchat };
      }
      return { privateChat: chat };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
