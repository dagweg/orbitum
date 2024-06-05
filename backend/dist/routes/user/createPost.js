"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const user_model_1 = require("../../models/user.model");
const posts_model_1 = require("../../models/posts.model");
async function createPost(req, res) {
    try {
        const { email, content } = req.body;
        let user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "User with that email doesn't exist" });
        }
        let post = await posts_model_1.Posts.create({
            user,
            content,
        });
        return res.json(post);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}
exports.createPost = createPost;
