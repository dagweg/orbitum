import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";
import { Message } from "../../models/message.model";
import { PrivateChat } from "../../models/private_chat.model";
import SocketEvents from "../../config/socketEvents";

type MessagePayload = {
  to: string;
  message: string;
};

export const handleMessageSend =
  (io: SocketIOServer, socket: Socket, userMap: Map<string, string>) =>
  async ({ to, message }: MessagePayload) => {
    console.log("SENDING MESSAGE TO ", to);
    console.log("MESSAGE IS ", message);
    const socketId = userMap.get(to);
    console.log("Socket ID is ", socketId);

    const msg = await sendMessage(socket.data.user.userId, to, message);

    if (msg.status === 200 || msg.status === 201) {
      // Send the message to the reciever in realtime
      io.to(socketId as string).emit(SocketEvents.EMIT_CHAT_RECIEVE_MESSAGE, {
        from: socket.data.user.userId,
        message,
      });
    } else {
      console.log("Error: ", msg.message);
    }
  };

export default async function sendMessage(
  from: string,
  to: string,
  message: string
): Promise<{
  status: number;
  message?: string | null;
}> {
  try {
    const msg = await Message.create({
      content: message,
      sender: from,
    });

    let pchat = await PrivateChat.findOne({
      $or: [
        { user1: from, user2: to },
        { user1: to, user2: from },
      ],
    });

    if (!pchat) {
      pchat = await PrivateChat.create({
        user1: from,
        user2: to,
        messages: [msg._id],
      });
      if (!pchat) {
        return {
          message: "Something went wrong trying to create a private chat",
          status: 500,
        };
      }
      return {
        message: msg.content,
        status: 201,
      };
    }

    pchat.messages.push(msg._id);
    await pchat.save();

    return {
      message: msg.content,
      status: 201,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
