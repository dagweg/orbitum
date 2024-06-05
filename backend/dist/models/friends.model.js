"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const friendsSchema = new mongoose_1.default.Schema({
    user1: {
        type: mongodb_1.ObjectId,
        ref: "User",
        required: true,
    },
    user2: {
        type: mongodb_1.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
    },
});
exports.Friends = mongoose_1.default.model("Friends", friendsSchema);
