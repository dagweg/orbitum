"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validatePOSTRequestSchema_1 = require("../../middlewares/validatePOSTRequestSchema");
const validateSession_1 = require("../../middlewares/validateSession");
const getAllPosts_1 = require("./getAllPosts");
const like_validation_1 = require("../../validators/like.validation");
const likePost_1 = require("./likePost");
function postsRouterHandler() {
    const router = express.Router();
    router.use(validateSession_1.validateSession);
    /** RETURNS THE POSTS OF ALL THE USERS */
    router.get("/", getAllPosts_1.getAllPosts);
    /** Like a post */
    router.post("/like", (0, validatePOSTRequestSchema_1.validatePOSTRequestSchema)(like_validation_1.likeSchema), likePost_1.likePost);
    return router;
}
exports.default = postsRouterHandler;
