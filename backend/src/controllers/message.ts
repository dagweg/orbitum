import { TAttachments, TAudio } from "../types/types";
import { Message as MessageModel } from "../models/message.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export class Message {
  constructor() {}

  async createMessageWithAttachment(
    content: string,
    attachmentId: mongoose.Types.ObjectId,
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
        attachment: attachmentId,
      });

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
