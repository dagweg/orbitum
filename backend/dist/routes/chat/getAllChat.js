"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = void 0;
const private_chat_model_1 = require("../../models/private_chat.model");
async function getAllChats(req, res) {
    try {
        const { userId } = req.user;
        // TODO : GET ALL CHATS CORRESPONDING TO THE ID
        // PRIVATE, GROUP and CHANNELS
        let chats = await private_chat_model_1.PrivateChat.find({
            $or: [{ user1: userId }, { user2: userId }],
        })
            .populate("user1", "firstName lastName profileUrl")
            .populate("user2", "firstName lastName profileUrl")
            .exec();
        let ret = chats.map((chat) => {
            const { user1, user2 } = chat.toObject();
            let ret;
            if (user1._id === userId) {
                ret = user2;
            }
            else {
                ret = user1;
            }
            return Object.assign({}, ret);
        });
        return res.json({
            people: ret,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(error);
    }
}
exports.getAllChats = getAllChats;
