import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";

export async function getPrivateChats(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    const chats = await PrivateChat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate(
        "user2",
        "userName email firstName lastName phoneNumber profileUrl settings"
      )
      .populate({ path: "messages" });

    return res.json({ chats });
  } catch (error) {
    return res.status(500).json(error);
  }
}
