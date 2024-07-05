import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";
import { ObjectId } from "mongodb";

export async function likePost(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { postId } = req.body;

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIdObjectString = String(new ObjectId(userId));
    if (post.likes.has(userIdObjectString)) {
      post.likes.set(userIdObjectString, !post.likes.get(userIdObjectString)); // toggle feature
      await post.save();
    } else {
      post.likes.set(userIdObjectString, true);
      await post.save();
    }

    return res.json({
      message: post.likes.get(userIdObjectString) ? "liked" : "disliked",
      likes: post.likes,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
