import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Posts } from "../../models/posts.model";

export async function createPost(req: Request, res: Response) {
  try {
    const { email, content } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with that email doesn't exist" });
    }

    let post = await Posts.create({
      user,
      content,
    });

    return res.json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
}
