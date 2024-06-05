"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateChats = void 0;
const private_chat_model_1 = require("../../models/private_chat.model");
async function getPrivateChats(req, res) {
    try {
        const { userId } = req.user;
        const chats = await private_chat_model_1.PrivateChat.find({
            $or: [{ user1: userId }, { user2: userId }],
        })
            .populate({
            path: "messages",
            select: "content",
            populate: {
                path: "sender",
                select: "userName email firstName lastName phoneNumber profileUrl settings",
            },
        })
            .populate("user2", "userName email firstName lastName phoneNumber profileUrl settings");
        return res.json(chats);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getPrivateChats = getPrivateChats;
