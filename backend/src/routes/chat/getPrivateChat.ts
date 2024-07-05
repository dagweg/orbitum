import { Request, Response } from "express";
import { PrivateChat } from "../../models/private_chat.model";
import { User } from "../../models/user.model";
import { MessageDocument } from "../../models/message.model";

export async function getPrivateChat(req: Request, res: Response) {
  try {
    const { userId } = req.user;
    const user2Id = req.query.userId;
    console.log("User 1 id ", userId);
    console.log("User 2 id ", user2Id);

    const chats = await PrivateChat.find({
      $or: [
        { user1: userId, user2: user2Id },
        { user2: userId, user1: user2Id },
      ],
    })
      .populate({
        path: "messages",
        populate: [
          {
            path: "sender",
            select: "firstName lastName userName email _id profilePicture",
            populate: {
              path: "profilePicture",
            },
          },
          {
            path: "views",
          },
        ],
      })
      .populate({
        path: "user1",
        populate: {
          path: "profilePicture",
        },
      })
      .populate({
        path: "user2",
        populate: {
          path: "profilePicture",
        },
      });

    if (!chats) {
      console.log("No private chats found trying GET.");

      return res.json({
        yourId: userId,
        recipientId: user2Id,
        messages: [],
      });
    }

    // If there is a chat then return it
    const ret = chats.flatMap((chat) =>
      (chat.toObject().messages as unknown as MessageDocument[]).map(
        (message) => ({
          ...message,
          you: message.sender._id.toString() === userId.toString(),
        })
      )
    );

    const recipient = await User.findById(
      user2Id,
      "userName email firstName lastName phoneNumber  profilePicture"
    ).populate("profilePicture");

    return res.json({
      yourId: userId,
      recipientId: user2Id,
      recipient: recipient,
      messages: ret,
    });
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json(error);
  }
}
