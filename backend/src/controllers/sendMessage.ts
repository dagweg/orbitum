import { Message } from "../models/message.model";
import { PrivateChat } from "../models/private_chat.model";

export default async function sendMessage(
  from: string,
  to: string,
  message: string
): Promise<{
  status: number;
  message?: string;
}> {
  try {
    const msg = await Message.create({
      content: message,
      sender: from,
    });

    const pchat = await PrivateChat.findOneAndUpdate(
      {
        $or: [
          { user1: from, user2: to },
          { user1: to, user2: from },
        ],
      },
      {
        $push: {
          messages: msg._id,
        },
      },
      { new: true } // Create the document if it doesn't exist
    );

    if (!pchat) {
      return {
        message: "No private chat found aborted message",
        status: 400,
      };
    }

    return {
      message: msg.content,
      status: 200,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
