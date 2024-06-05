"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const settings_model_1 = require("./settings.model");
const userSchema = new mongoose_1.default.Schema({
    userName: { type: String, unique: true, require: true },
    email: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, require: true },
    password: { type: String, required: true },
    bio: { type: String },
    phoneNumber: { type: String },
    profileUrl: { type: String },
    otp: { type: String, default: null },
    otpExpiry: { type: Date },
    emailVerified: { type: Boolean, default: false },
    settings: {
        type: mongodb_1.ObjectId,
        ref: settings_model_1.Settings,
    },
    friends: [
        {
            type: mongodb_1.ObjectId,
            ref: "Friends",
        },
    ],
    groupMemberships: [
        {
            type: mongodb_1.ObjectId,
            ref: "GroupMembership",
        },
    ],
    channelMemberships: [
        {
            type: mongodb_1.ObjectId,
            ref: "ChannelMembership",
        },
    ],
    posts: [
        {
            type: mongodb_1.ObjectId,
            ref: "Posts",
        },
    ],
    stories: [
        {
            type: mongodb_1.ObjectId,
            ref: "Stories",
        },
    ],
});
exports.User = mongoose_1.default.model("User", userSchema);
