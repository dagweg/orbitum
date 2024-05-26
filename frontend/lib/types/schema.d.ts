import { z } from "zod";
import { UserSchema, UserSchemaRefined } from "../validators/user.validation";
import { LoginSchema } from "../validators/login.validation";
import { OTPVerifySchema } from "../validators/otpVerify.validation";
import { PostSchemaRefined } from "../validators/post.validation";

export type TUserSchema = z.infer<typeof UserSchema>;
export type TLoginSchema = z.infer<typeof LoginSchema>;
export type TPostSchema = z.infer<typeof PostSchemaRefined>;

export type TOTPVerifySchema = z.infer<typeof OTPVerifySchema>;
