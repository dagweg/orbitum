import { Request, Response } from "express";
import { Comments } from "../../models/comments.model";
import { Posts } from "../../models/posts.model";
import mongoose from "mongoose";

export async function postComment(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { postId, comment } = req.body;

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "There is no post with such id!",
      });
    }

    const newComment = await Comments.create({
      user: userId,
      post: postId,
      text: comment,
    });

    newComment.populate("user", "-password");
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();

    return res.json(newComment);
  } catch (error) {
    return res.status(500).json(error);
  }
}
