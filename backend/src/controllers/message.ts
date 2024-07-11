import { TAttachments, TAudio } from "../types/types";
import { Message as MessageModel } from "../models/message.model";
import mongoose from "mongoose";

export class Message {
  constructor() {}

  async createMessageWithAttachment(
    content: string,
    attachmentId: mongoose.Types.ObjectId
  ): Promise<{
    message?: Object;
    error?: Error;
  }> {
    try {
      const message = await MessageModel.create({
        content,
        attachment: attachmentId,
      });

      return { message };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createMessage(content: string): Promise<{
    message?: Object;
    error?: Error;
  }> {
    try {
      const message = await MessageModel.create({
        content,
      });

      return { message };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createAudioMessage(
    audioId: mongoose.Types.ObjectId
  ): Promise<{ message?: Object; error?: Error }> {
    try {
      const message = await MessageModel.create({
        audio: audioId,
      });
      return { message };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async createVideoMessage(
    videoId: mongoose.Types.ObjectId
  ): Promise<{ message?: Object; error?: Error }> {
    try {
      const message = await MessageModel.create({
        video: videoId,
      });
      return { message };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
