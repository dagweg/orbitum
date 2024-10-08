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

export type TFile = {
  name: string;
  type: string;
  base64: string;
  url?: string;
};

export type TAttachments = TFile[];

export type TMessagePayload = {
  to: string;
  content?: string;
  attachment?: TAttachments;
  audio?: TAudio;
  video?: TVideo;
};
