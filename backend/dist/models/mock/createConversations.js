"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversations = void 0;
const private_chat_model_1 = require("../private_chat.model");
const message_model_1 = require("../message.model");
// Assuming you have the IDs of the users
const userIds = [
    "6659c74638704e050276ff9d",
    "6659ca0938704e05027700a5",
    "6659ca6938704e0502770101",
];
// Function to create a private chat between two users
async function createPrivateChat(user1, user2) {
    try {
        const chat = new private_chat_model_1.PrivateChat({ user1, user2, messages: [] });
        await chat.save();
        return chat._id;
    }
    catch (error) {
        console.error("Error creating private chat:", error);
        throw error;
    }
}
// Function to create a message
async function createMessage(sender, content) {
    try {
        const message = new message_model_1.Message({ sender, content });
        await message.save();
        return message._id;
    }
    catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
}
// Function to add messages to a private chat
async function addMessagesToChat(chatId, messages) {
    try {
        const chat = await private_chat_model_1.PrivateChat.findById(chatId);
        if (!chat) {
            console.error("Private chat not found");
            return;
        }
        chat.messages.push(...messages);
        await chat.save();
    }
    catch (error) {
        console.error("Error adding messages to chat:", error);
        throw error;
    }
}
// Create conversations between the users
async function createConversations() {
    try {
        const user1 = userIds[0];
        const user2 = userIds[1];
        const user3 = userIds[2];
        // Create private chats
        const chat1 = await createPrivateChat(user1, user2);
        const chat2 = await createPrivateChat(user1, user3);
        const chat3 = await createPrivateChat(user2, user3);
        // Create messages
        const messages = await Promise.all([
            createMessage(user1, "Hello from user 1"),
            createMessage(user2, "Hi from user 2"),
            createMessage(user1, "How are you?"),
            createMessage(user3, "Hey there!"),
            createMessage(user2, "I'm good, thanks!"),
            createMessage(user3, "Doing great, thanks for asking!"),
        ]);
        // Add messages to chats
        await addMessagesToChat(chat1, [messages[0], messages[1], messages[4]]);
        await addMessagesToChat(chat2, [messages[2], messages[3]]);
        await addMessagesToChat(chat3, [messages[5]]);
        console.log("Mock conversations created successfully!");
    }
    catch (error) {
        console.error("Error creating conversations:", error);
    }
}
exports.createConversations = createConversations;
