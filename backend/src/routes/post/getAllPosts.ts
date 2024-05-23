import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Posts } from "../../models/posts.model";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Posts.find({}).populate("user", {});

    return res.json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
}
