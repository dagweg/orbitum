import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { Posts } from "../../models/posts.model";
import { PostVideos } from "../../models/postVideos.model";
import {
  TPostImagesSchema,
  TPostRequestSchema,
  TPostVideosSchema,
} from "../../types/schema";
import { PostImages } from "../../models/postImages.model";

export async function createPost(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    const { content } = req.body;
    const { images } = req.body;
    const { videos } = req.body;

    let videoIds: string[] = [];
    let imageIds: string[] = [];

    const post = await Posts.create({
      user: userId,
      content,
    });

    if (images) {
      const imagePromises = images.map(async (image: any) => {
        const newImage = await PostImages.create({
          postId: post._id,
          dataBase64: image.dataBase64,
          name: image.name,
          type: image.type,
        });
        return newImage._id;
      });
      const createdImageIds = await Promise.all(imagePromises);
      imageIds.push(...createdImageIds);
    }

    if (videos) {
      const videoPromises = videos.map(async (video: any) => {
        const newVideo = await PostVideos.create({
          postId: post._id,
          dataBase64: video.dataBase64,
          name: video.name,
          type: video.type,
        });
        return newVideo._id;
      });
      const createdVideoIds = await Promise.all(videoPromises);
      videoIds.push(...createdVideoIds);
    }

    post.images = imageIds as any;
    post.videos = videoIds as any;
    await post.save();

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
