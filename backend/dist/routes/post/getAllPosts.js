"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const posts_model_1 = require("../../models/posts.model");
async function getAllPosts(req, res) {
    try {
        const posts = await posts_model_1.Posts.find({}).populate("user", {});
        return res.json(posts);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getAllPosts = getAllPosts;
