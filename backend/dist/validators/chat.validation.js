"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPrivateChatSchema = void 0;
const zod_1 = require("zod");
exports.GetPrivateChatSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User Id cannot be empty"),
});
