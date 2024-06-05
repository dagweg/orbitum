import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { Message, MessageDocument } from "../../models/message.model";
import { User } from "../../models/user.model";

export async function getAllChats(req: Request, res: Response) {
  try {
    const { userId } = req.user;

    // TODO : GET ALL CHATS CORRESPONDING TO THE ID
    // PRIVATE, GROUP and CHANNELS

    let chats = await PrivateChat.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "firstName lastName profileUrl")
      .populate("user2", "firstName lastName profileUrl")
      .exec();

    let ret = chats.map((chat) => {
      const { user1, user2 } = chat.toObject();
      let ret;
      if (user1._id === userId) {
        ret = user2;
      } else {
        ret = user1;
      }
      return {
        ...ret,
      };
    });

    return res.json({
      people: ret,
    });
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
