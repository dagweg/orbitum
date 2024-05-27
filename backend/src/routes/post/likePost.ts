import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";

export async function likePost(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { postId } = req.body;

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let message = "";
    if (post.likes.includes(userId)) {
      post.likes.remove(userId);
      await post.save();
      message = "unliked";
    } else {
      post.likes.push(userId);
      await post.save();
      message = "liked";
    }

    return res.json({ message, likes: post.likes });
  } catch (error) {
    return res.status(500).json(error);
  }
}
