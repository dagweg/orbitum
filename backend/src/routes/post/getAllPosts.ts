import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const userIdObject = new ObjectId(userId);

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
      .populate("shares")
      .populate("likes");

    let newPosts = posts
      .sort(
        (a, b) =>
          (b.createdAt as Date).getTime() - (a.createdAt as Date).getTime()
      )
      .map((p) => {
        const post = p.toObject();
        return {
          ...post,
          likes: Object.fromEntries(post.likes),
          liked: post.likes.get(userId) ?? false,
          likes_count: Array.from(post.likes).filter((p) => p[1]).length,
        };
      });
    console.log(newPosts);
    return res.json(newPosts);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
