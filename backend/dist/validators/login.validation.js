"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
    password: zod_1.z
        .string()
        .refine((data) => data.trim().length > 0, { message: "Cannot be empty." }),
});
