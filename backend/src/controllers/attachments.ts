import mongoose from "mongoose";
import { TAttachments } from "../types/types";
import { identifyMultimediaFileType } from "../utils/file";
import { Video } from "../models/video.model";
import { Audio } from "../models/audio.model";
import { Image } from "../models/Image.model";
import { Attachment } from "../models/attachments.model";

export default class Attachments {
  constructor() {}

  async createAttachment(attachments: TAttachments): Promise<{
    attachmentId?: mongoose.Types.ObjectId;
    error?: Error;
  }> {
    try {
      if (attachments.length === 0) throw new Error("No attachments provided");

      const attachmentIds = {
        photo: Array<mongoose.Types.ObjectId>(),
        video: Array<mongoose.Types.ObjectId>(),
        audio: Array<mongoose.Types.ObjectId>(),
      };

      for (const attachment of attachments) {
        const fileType = identifyMultimediaFileType(attachment.type);

        const { name, type, base64 } = attachment;

        let newAttachment;
        switch (fileType.toLowerCase()) {
          case "photo":
            newAttachment = await Image.create({
              name,
              type,
              base64,
            });
            attachmentIds.photo.push(newAttachment._id);
            break;
          case "audio":
            newAttachment = await Audio.create({
              name,
              type,
              base64,
            });
            attachmentIds.audio.push(newAttachment._id);
            break;
          case "video":
            newAttachment = await Video.create({
              name,
              type,
              base64,
            });
            attachmentIds.video.push(newAttachment._id);
            break;
          default:
            throw new Error(
              "The file type is Unknown please provide a file with supported type extension."
            );
        }
      }

      const combinedAttachments = await Attachment.create({
        audios: attachmentIds.audio,
        images: attachmentIds.photo,
        videos: attachmentIds.video,
      });

      return { attachmentId: combinedAttachments._id };
    } catch (error) {
      return { error: error as Error };
    }
  }
}
