"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("../models/message.model");
const private_chat_model_1 = require("../models/private_chat.model");
async function sendMessage(from, to, message) {
    try {
        const msg = await message_model_1.Message.create({
            content: message,
            sender: from,
        });
        let pchat = await private_chat_model_1.PrivateChat.findOne({
            $or: [
                { user1: from, user2: to },
                { user1: to, user2: from },
            ],
        });
        if (!pchat) {
            pchat = await private_chat_model_1.PrivateChat.create({
                user1: from,
                user2: to,
                messages: [msg._id]
            });
            if (!pchat) {
                return {
                    message: "Something went wrong trying to create a private chat",
                    status: 500
                };
            }
            return {
                message: msg.content,
                status: 201,
            };
        }
        pchat.messages.push(msg._id);
        await pchat.save();
        return {
            message: msg.content,
            status: 201,
        };
    }
    catch (error) {
        return { message: error.message, status: 500 };
    }
}
exports.default = sendMessage;
