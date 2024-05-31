import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { Message } from "../../models/message.model";

export async function getPrivateChat(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const user2Id = req.query.userId;
    console.log("User 1 id ", userId);
    console.log("User 2 id ", user2Id);

    let chat = await PrivateChat.find({
      $or: [
        { user1: userId, user2: user2Id },
        { user2: userId, user1: user2Id },
      ],
    })
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "firstName lastName userName email _id profileUrl",
        },
      })
      .populate("user1")
      .populate("user2");

    return res.json(chat);
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
