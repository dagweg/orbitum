import { z } from "zod";
import { UserSchemaRefined } from "../validators/user.validation";
import { LoginSchema } from "../validators/login.validation";
import { OTPVerifySchema } from "../validators/otpVerify.validation";
import { PostSchema, PostSchemaRefined } from "../validators/post.validation";
import { Message } from "../models/message.model";
import { PostVideos } from "../models/video.model";
import { Images } from "../models/Images.model";

export type TUserSchema = z.infer<typeof UserSchemaRefined>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TPostSchema = z.infer<typeof PostSchemaRefined>;
export type TPostRequestSchema = z.infer<typeof PostSchema>;
export type TPostVideosSchema = z.infer<typeof PostVideos>;
export type TImageSchema = z.infer<typeof Images>;

// export type TMessageSchema = z.infer<typeof Message>;

export type TOTPVerifySchema = z.infer<typeof OTPVerifySchema>;
