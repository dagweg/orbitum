"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchemaRefined = exports.PostSchema = void 0;
const zod_1 = require("zod");
exports.PostSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Post cannot be empty"),
});
exports.PostSchemaRefined = zod_1.z.object({
    user: zod_1.z.string(),
    content: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    likes: zod_1.z.array(zod_1.z.string()),
    comments: zod_1.z.array(zod_1.z.string()),
    shares: zod_1.z.array(zod_1.z.string()),
    postType: zod_1.z.string(),
    imageUrl: zod_1.z.string(),
    videoUrl: zod_1.z.string(),
    privacy: zod_1.z.string(),
});
