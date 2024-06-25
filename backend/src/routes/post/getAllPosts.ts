import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Posts } from "../../models/posts.model";
import { populate } from "dotenv";

export async function getAllPosts(req: Request, res: Response) {
  try {
    let posts = await Posts.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          populate: {
            path: "profilePicture",
          },
        },
      })
      .populate("images")
      .populate("videos")
      .populate("shares");

    posts = posts.sort(
      (a, b) =>
        (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime()
    );

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
