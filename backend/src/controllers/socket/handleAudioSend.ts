import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";
import { Message } from "../../models/message.model";
import { PrivateChat } from "../../models/private_chat.model";
import { Audios } from "../../models/audio.model";
import SocketEvents from "../../config/socketEvents";

type Audio = {
  name: string;
  type: string;
  base64: string;
};
type AudioPayload = {
  to: string;
  audio: Audio;
};

export const handleAudioSend =
  (io: SocketIOServer, socket: Socket, userMap: Map<string, string>) =>
  async ({ to, audio }: AudioPayload) => {
    console.log("SENDING AUDIO TO ", to);
    console.log("AUDIO IS ", audio);

    const socketId = userMap.get(to);
    console.log("Socket ID is ", socketId);

    const msg = await sendAudio(socket.data.user.userId, to, audio);

    if (msg.status === 200 || msg.status === 201) {
      // Send the audio to the reciever in realtime
      io.to(socketId as string).emit(SocketEvents.EMIT_CHAT_RECIEVE_AUDIO, {
        from: socket.data.user.userId,
        audio,
      });
    } else {
      console.log("Error: ", msg.message);
    }
  };

async function sendAudio(
  from: string,
  to: string,
  audio: Audio
): Promise<{
  status: number;
  message?: string | null;
}> {
  try {
    const newAudio = await Audios.create({
      base64: audio.base64,
      name: audio.name,
      type: audio.type,
    });

    const msg = await Message.create({
      audio: newAudio._id,
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
        message: String(newAudio),
        status: 201,
      };
    }

    pchat.messages.push(msg._id);
    await pchat.save();

    return {
      message: String(newAudio),
      status: 201,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}
