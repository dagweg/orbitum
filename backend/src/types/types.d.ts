import { z } from "zod";

export type TZodErrors = { [key: string]: z.ZodIssue };

export type TPhoto = {
  type: string;
  base64: string;
};

export type TAttachPhoto = TPhoto & {
  name: string;
};

export type TAudio = {
  type: string;
  base64: string;
};

export type TAttachAudio = TAudio & {
  name: string;
};

export type TVideo = {
  type: string;
  base64: string;
};

export type TAttachVideo = TVideo & {
  name: string;
};

export type TAttachments = TAttachAudio[] | TAttachVideo[] | TAttachPhoto[];

export type TMessagePayload = {
  to: string;
  content?: string;
  attachments?: TAttachments;
  audio?: TAudio;
  video?: TVideo;
};
