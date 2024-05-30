import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";

export async function getPrivateChats(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    const chats = await PrivateChat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate({
        path: "messages",
        select: "content",
        populate: {
          path: "sender",
          select:
            "userName email firstName lastName phoneNumber profileUrl settings",
        },
      })
      .populate(
        "user2",
        "userName email firstName lastName phoneNumber profileUrl settings"
      );

    return res.json(chats);
  } catch (error) {
    return res.status(500).json(error);
  }
}
