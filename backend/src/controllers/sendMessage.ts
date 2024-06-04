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

    let pchat = await PrivateChat.findOneAndUpdate(
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
    );

    if (!pchat) {
      pchat = await PrivateChat.create({
        user1: from,
        user2: to,
        messages : [msg]
      })
      if(!pchat){
        return {
          message: "Something went wrong trying to create a private chat",
          status: 500
        }
      }
      return {
        message: msg.content,
        status: 201,
      };
    }

    return {
      message: msg.content,
      status: 201,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
