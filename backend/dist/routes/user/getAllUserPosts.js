"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserPosts = void 0;
const posts_model_1 = require("../../models/posts.model");
const user_model_1 = require("../../models/user.model");
async function getAllUserPosts(req, res) {
    try {
        const { email } = req.user;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const posts = await posts_model_1.Posts.find({ user: user._id });
        return res.json(posts);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.getAllUserPosts = getAllUserPosts;
