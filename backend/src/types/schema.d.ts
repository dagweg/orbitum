import { z } from "zod";
import { UserSchemaRefined } from "../validators/user.validation";
import { LoginSchema } from "../validators/login.validation";
import { OTPVerifySchema } from "../validators/otpVerify.validation";
import { PostSchemaRefined } from "../validators/post.validation";
import { Message } from "../models/message.model";

export type TUserSchema = z.infer<typeof UserSchemaRefined>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TPostSchema = z.infer<typeof PostSchemaRefined>;
// export type TMessageSchema = z.infer<typeof Message>;

export type TOTPVerifySchema = z.infer<typeof OTPVerifySchema>;
