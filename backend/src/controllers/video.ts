import mongoose from "mongoose";
import { Video as VideoModel } from "../models/video.model";

export class Video {
  constructor() {}

  async createVideo(
    type: string,
    base64: string
  ): Promise<{ id?: mongoose.Types.ObjectId; error?: Error }> {
    try {
      const video = await VideoModel.create({
        type,
        base64,
      });
      return { id: video._id };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
