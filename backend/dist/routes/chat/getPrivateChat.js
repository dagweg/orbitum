"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateChat = void 0;
const private_chat_model_1 = require("../../models/private_chat.model");
const user_model_1 = require("../../models/user.model");
async function getPrivateChat(req, res) {
    try {
        const { userId } = req.user;
        const user2Id = req.query.userId;
        console.log("User 1 id ", userId);
        console.log("User 2 id ", user2Id);
        let chats = await private_chat_model_1.PrivateChat.find({
            $or: [
                { user1: userId, user2: user2Id },
                { user2: userId, user1: user2Id },
            ],
        })
            .populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "firstName lastName userName email _id profileUrl",
            },
        })
            .populate("user1")
            .populate("user2");
        if (!chats) {
            console.log("No private chats found trying GET.");
            return res.json({
                yourId: userId,
                recipientId: user2Id,
                messages: [],
            });
        }
        // If there is a chat then return it
        let ret = chats.map((chat) => chat.toObject().messages.map((message) => (Object.assign(Object.assign({}, message), { you: message.sender._id.toString() === userId.toString() }))));
        const recipient = await user_model_1.User.findById(user2Id, "userName email firstName lastName phoneNumber  profileUrl");
        return res.json({
            yourId: userId,
            recipientId: user2Id,
            recipient: recipient,
            messages: ret.flat(1),
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}
exports.getPrivateChat = getPrivateChat;
