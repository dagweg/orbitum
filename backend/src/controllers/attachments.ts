import mongoose from "mongoose";
import { TAttachments } from "../types/types";
import { identifyMultimediaFileType } from "../utils/file";
import { Video } from "../models/video.model";
import { Audio } from "../models/audio.model";
import { Image } from "../models/Image.model";
import { FileModel } from "../models/file.model";

export default class Attachments {
  constructor() {}

  async createAttachment(attachments: TAttachments): Promise<{
    fileIds?: mongoose.Types.ObjectId[];
    error?: Error;
  }> {
    try {
      if (attachments.length === 0)
        throw new Error("No attachment files provided");

      const fileIds = Array<mongoose.Types.ObjectId>();

      for (const attachment of attachments) {
        const fileType = identifyMultimediaFileType(attachment.type);

        const { name, type, base64 } = attachment;

        let newFile = await FileModel.create({
          name,
          type,
          base64,
        });
        fileIds.push(newFile._id);
      }

      return { fileIds };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
