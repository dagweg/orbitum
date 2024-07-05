import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";

export async function getAllChats(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    // TODO : GET ALL CHATS CORRESPONDING TO THE ID
    // PRIVATE, GROUP and CHANNELS
    // console.log("USER ID ", userId);

    const chats = await PrivateChat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate({
        path: "user1",
        select: "_id firstName lastName profilePicture",
        populate: {
          path: "profilePicture",
        },
      })
      .populate({
        path: "user2",
        select: "_id firstName lastName profilePicture",
        populate: {
          path: "profilePicture",
        },
      })
      .populate("messages", "content date")
      .exec();
    console.log(chats);
    const ret = chats.map((chat) => {
      const { user1, user2, messages } = chat.toObject();
      const recentMessage = messages.sort(
        (a: unknown, b: unknown) =>
          (b as { date: Date }).date.getTime() -
          (a as { date: Date }).date.getTime()
      )[0];
      let ret;

      if (user1._id.toString() === userId) {
        ret = user2;
      } else {
        ret = user1;
      }
      return {
        ...ret,
        recentMessage,
      };
    });

    return res.json({
      people: ret,
    });
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json({ error: (error as Error).message });
  }
}
