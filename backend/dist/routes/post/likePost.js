"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = void 0;
const posts_model_1 = require("../../models/posts.model");
async function likePost(req, res) {
    try {
        const { userId } = req.user;
        const { postId } = req.body;
        const post = await posts_model_1.Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        let message = "";
        if (post.likes.includes(userId)) {
            post.likes.remove(userId);
            await post.save();
            message = "unliked";
        }
        else {
            post.likes.push(userId);
            await post.save();
            message = "liked";
        }
        return res.json({ message, likes: post.likes });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.likePost = likePost;
