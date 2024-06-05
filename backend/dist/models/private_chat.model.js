"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateChat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const privateChatSchema = new mongoose_1.default.Schema({
    user1: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user2: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    messages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
});
exports.PrivateChat = mongoose_1.default.model("PrivateChat", privateChatSchema);
