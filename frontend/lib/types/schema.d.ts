import { z } from "zod";
import { UserSchema, UserSchemaRefined } from "../validators/user.validation";
import { LoginSchema } from "../validators/login.validation";
import { OTPVerifySchema } from "../validators/otpVerify.validation";
import { PostSchemaRefined } from "../validators/post.validation";
import { MessageSchema } from "../validators/chat.validation";
import { AudioSchema } from "../validators/audio.validation";

export type TUserSchema = z.infer<typeof UserSchema>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TPostSchemaResponse = z.infer<typeof PostSchemaRefined>;
export interface IPostSchema extends TPostSchemaResponse {
  likes: Map<string, boolean>;
  likes_count: number;
  liked: boolean;
}
export type TMessageSchema = z.infer<typeof MessageSchema>;
export type TAudioSchema = z.infer<typeof AudioSchema>;

export type TOTPVerifySchema = z.infer<typeof OTPVerifySchema>;
