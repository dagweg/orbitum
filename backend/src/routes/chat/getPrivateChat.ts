import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { Message, MessageDocument } from "../../models/message.model";

export async function getPrivateChat(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const user2Id = req.query.userId;
    console.log("User 1 id ", userId);
    console.log("User 2 id ", user2Id);

    let chats = await PrivateChat.find({
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
          // how can I add a custom field you : boolean that specifies if the sender is you or not to later be used in the client side for correct rendering. since I'm using httponly cookie I cant' access user information in the lcient side
        },
      })
      .populate("user1")
      .populate("user2");

    let ret = chats.map((chat) =>
      chat.toObject().messages.map((message: any) => ({
        ...message,
        you: message.sender._id.toString() === userId.toString(),
      }))
    );

    return res.json(ret.flat(1));
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
