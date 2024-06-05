"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSchema = exports.UserSchemaRefined = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    userName: zod_1.z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" }),
    firstName: zod_1.z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" }),
    lastName: zod_1.z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" }),
    phoneNumber: zod_1.z
        .string()
        .regex(/^\+\d{12}$/, {
        message: "Must be a valid phone number",
    })
        .optional(),
    email: zod_1.z
        .string()
        .regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, { message: "Must be a valid email" }),
    password: zod_1.z
        .string()
        .min(8, { message: " Password must be at least 8 characters long" })
        .regex(/^.*\d+.*$/, {
        message: "Password must contain at least 1 number",
    })
        .regex(/^.*[A-Z]+.*$/, {
        message: "Password must contain at least 1 uppercase letter",
    })
        .regex(/^.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?\/].*$/, {
        message: "Password must contain at least 1 special character.",
    }),
    confirmPassWord: zod_1.z.string(),
    otp: zod_1.z.string().optional(),
    otpExpiry: zod_1.z.date().optional(),
    profileUrl: zod_1.z.string().optional(),
    settings: zod_1.z.string().optional(),
    friends: zod_1.z.array(zod_1.z.string()).optional(),
    groupMemberships: zod_1.z.array(zod_1.z.string()).optional(),
    channelMemberships: zod_1.z.array(zod_1.z.string()).optional(),
    posts: zod_1.z.array(zod_1.z.string()).optional(),
    stories: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.UserSchemaRefined = exports.UserSchema.refine((data) => data.password === data.confirmPassWord, {
    message: "Passwords do not match.",
    path: ["confirmPassWord"],
});
exports.GetUserSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "Cannot be empty"),
});
