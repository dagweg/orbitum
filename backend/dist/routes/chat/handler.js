"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validateSession_1 = require("../../middlewares/validateSession");
const getPrivateChats_1 = require("./getPrivateChats");
const getPrivateChat_1 = require("./getPrivateChat");
const validateGETRequestSchema_1 = require("../../middlewares/validateGETRequestSchema");
const chat_validation_1 = require("../../validators/chat.validation");
const getAllChat_1 = require("./getAllChat");
function chatRouteHandler() {
    const router = express.Router();
    router.use(validateSession_1.validateSession);
    router.get("/private", getPrivateChats_1.getPrivateChats);
    router.get("/private/user", (0, validateGETRequestSchema_1.validateGETRequestSchema)(chat_validation_1.GetPrivateChatSchema), getPrivateChat_1.getPrivateChat);
    router.get("/all", getAllChat_1.getAllChats);
    return router;
}
exports.default = chatRouteHandler;
