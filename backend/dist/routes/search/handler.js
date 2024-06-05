"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHandler = void 0;
const express = require("express");
const search_validation_1 = require("../../validators/search.validation");
const searchChatSidebar_1 = require("./searchChatSidebar");
const validateSession_1 = require("../../middlewares/validateSession");
const validateGETRequestSchema_1 = require("../../middlewares/validateGETRequestSchema");
function searchHandler() {
    const router = express.Router();
    router.use(validateSession_1.validateSession);
    router.get("/chat/sidebar", (0, validateGETRequestSchema_1.validateGETRequestSchema)(search_validation_1.SearchSchema), searchChatSidebar_1.searchChatSidebar);
    return router;
}
exports.searchHandler = searchHandler;
