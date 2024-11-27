import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";

export async function likePost(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { postId } = req.body;

    // const userIdObject = new mongoose.Types.ObjectId(userId);

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes.set(userId, !(post.likes.get(userId) ?? false)); // toggle feature
    await post.save();

    console.log(post);

    return res.json({
      message: post.likes.get(userId) ? "liked" : "disliked",
      likes: Object.fromEntries(post.likes),
      liked: post.likes.get(userId),
      likes_count: Array.from(post.likes).filter((p) => p[1]).length,
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
