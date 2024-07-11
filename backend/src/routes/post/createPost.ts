import { Request, Response } from "express";
import { Posts } from "../../models/posts.model";
import { Video } from "../../models/video.model";
import { Types } from "mongoose";
import { Image } from "../../models/Image.model";

export async function createPost(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const { content, images, videos } = req.body;

    const videoIds: Types.ObjectId[] = [];
    const imageIds: Types.ObjectId[] = [];

    console.log(images);
    console.log(videos);
    // Handling image creation and collecting their IDs
    if (images)
      for (let i = 0; i < images.length; i++) {
        const curr = images[i];
        const image = await Image.create({
          base64: curr.base64,
          name: curr.name,
          type: curr.type,
        });
        imageIds.push(image._id as Types.ObjectId);
      }

    // Handling video creation and collecting their IDs
    if (videos)
      for (let i = 0; i < videos.length; i++) {
        const curr = videos[i];
        const video = await Video.create({
          base64: curr.base64,
          name: curr.name,
          type: curr.type,
        });
        videoIds.push(video._id as Types.ObjectId);
      }

    // Creating the post with references to the images and videos
    const post = await Posts.create({
      user: userId,
      content,
      images: imageIds,
      videos: videoIds,
    });

    await post.populate("user");
    await post.populate("likes");
    await post.populate("comments");
    await post.populate("shares");
    await post.populate("videos");
    await post.populate("images");

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

// if (images) {
//   const imagePromises = images.map(async (image: any) => {
//     return await Images.create({
//       postId: post._id,
//       dataBase64: image.dataBase64,
//       name: image.name,
//       type: image.type,
//     });
//   });
//   const createdImageIds = await Promise.all(imagePromises);
//   imageIds.push(...createdImageIds.map((image) => image._id));
// }

// if (videos) {
//   const videoPromises = videos.map(async (video: any) => {
//     const newVideo = await PostVideos.create({
//       postId: post._id,
//       dataBase64: video.dataBase64,
//       name: video.name,
//       type: video.type,
//     });
//     return newVideo._id;
//   });
//   const createdVideoIds = await Promise.all(videoPromises);
//   videoIds.push(...createdVideoIds.map((video) => video._id));
// }

// post.images = imageIds as any;
// post.videos = videoIds as any;

// console.log(post.images);
// console.log(post.videos);
// await post.save();
