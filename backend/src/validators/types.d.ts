import { z } from "zod";
import { UserSchemaRefined } from "./user.validation";
import { LoginSchema } from "../routes/user/login";

export type TUserSchema = z.infer<typeof UserSchemaRefined>;

export type TZodErrors = { [key: string]: z.ZodIssue };

export type TLoginSchema = z.infer<typeof LoginSchema>;
