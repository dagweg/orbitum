"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelMembership = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const channelMembershipSchema = new mongoose_1.default.Schema({
    channelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "member", "moderator"],
        default: "member",
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.ChannelMembership = mongoose_1.default.model("ChannelMembership", channelMembershipSchema);
