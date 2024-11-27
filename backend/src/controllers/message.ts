import { Message as MessageModel } from "../models/message.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export class Message {
  constructor() {}

  async createMessageWithAttachment(
    fileIds: mongoose.Types.ObjectId[],
    sender: mongoose.Types.ObjectId,
    content?: string
  ): Promise<{
    message?: Object;
    id?: ObjectId;
    error?: Error;
  }> {
    try {
      const message = await MessageModel.create({
        sender,
        content,
        attachment: fileIds,
      });
      console.log(message);
      // await message.populate("attachment");
      return { message, id: message._id };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createMessage(
    content: string,
    sender: mongoose.Types.ObjectId
  ): Promise<{
    message?: Object;
    id?: ObjectId;
    error?: Error;
  }> {
    try {
      const message = await MessageModel.create({
        sender,
        content,
      });

      return { message, id: message._id };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createAudioMessage(
    audioId: mongoose.Types.ObjectId,
    sender: mongoose.Types.ObjectId
  ): Promise<{ message?: Object; id?: ObjectId; error?: Error }> {
    try {
      const message = await MessageModel.create({
        sender,
        audio: audioId,
      });
      return { message, id: message._id };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createVideoMessage(
    videoId: mongoose.Types.ObjectId,
    sender: mongoose.Types.ObjectId
  ): Promise<{ message?: Object; id?: ObjectId; error?: Error }> {
    try {
      const message = await MessageModel.create({
        sender,
        video: videoId,
      });
      return { message, id: message._id };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
