"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeSchema = void 0;
const zod_1 = require("zod");
exports.likeSchema = zod_1.z.object({
    postId: zod_1.z.string().min(1, "PostId Cannot be empty"),
});
