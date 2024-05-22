import { z } from "zod";
import { UserSchemaRefined } from "../validators/user.validation";
import { LoginSchema } from "../validators/login.validation";

export type TUserSchema = z.infer<typeof UserSchemaRefined>;

export type TZodErrors = { [key: string]: z.ZodIssue };

export type TLoginSchema = z.infer<typeof LoginSchema>;