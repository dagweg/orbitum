import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";
import { User } from "../../models/user.model";

export async function getAllUserPosts(req: Request, res: Response) {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Posts.find({ user: user._id });

    return res.json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
}
