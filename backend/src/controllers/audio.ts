import mongoose from "mongoose";
import { Audio as AudioModel } from "../models/audio.model";

export class Audio {
  constructor() {}

  async createAudio(
    type: string,
    base64: string
  ): Promise<{ id?: mongoose.Types.ObjectId; error?: Error }> {
    try {
      const newAudio = await AudioModel.create({
        type,
        base64,
      });
      return { id: newAudio._id };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
