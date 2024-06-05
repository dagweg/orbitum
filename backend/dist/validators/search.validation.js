"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSchema = void 0;
const zod_1 = require("zod");
exports.SearchSchema = zod_1.z.object({
    query: zod_1.z.string().min(1, "Search query cannot be empty"),
});
