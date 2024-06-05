"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const postsSchema = new mongoose_1.default.Schema({
    user: {
        type: mongodb_1.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongodb_1.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongodb_1.ObjectId,
            ref: "Comments",
        },
    ],
    shares: [
        {
            type: mongodb_1.ObjectId,
            ref: "User",
        },
    ],
    postType: {
        type: String,
        enum: ["text", "image", "video"],
        default: "text",
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    privacy: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "public",
    },
});
exports.Posts = mongoose_1.default.model("Posts", postsSchema);
