import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";
import { Message } from "../../models/message.model";
import { PrivateChat } from "../../models/private_chat.model";
import SocketEvents from "../../config/socketEvents";
import { Audios } from "../../models/audio.model";

type Photo = {
  type: string;
  base64: string;
};

type AttachPhoto = Photo & {
  name: string;
};

type Audio = {
  type: string;
  base64: string;
};

type AttachAudio = Audio & {
  name: string;
};

type Video = {
  type: string;
  base64: string;
};

type AttachVideo = Video & {
  name: string;
};

type MessagePayload = {
  to: string;
  content?: string;
  attachments?: AttachAudio[] | AttachVideo[] | AttachPhoto[];
  audio?: Audio;
  video?: Video;
};

export const handleMessageSend =
  (io: SocketIOServer, socket: Socket, userMap: Map<string, string>) =>
  async ({ to, content, audio, video, attachments }: MessagePayload) => {
    console.log("SENDING MESSAGE TO ", to);
    console.log("MESSAGE IS ", content);
    const socketId = userMap.get(to);
    console.log("Socket ID is ", socketId);

    let msg;

    if (audio) {
      msg = await sendAudio(socket.data.user.userId, to, audio);
    }

    if (video) {
      // msg = await sendVideo(socket.data.user.userId, to, video)
    }

    if (content) {
      msg = await sendMessage(socket.data.user.userId, to, content);
    }

    if (msg) {
      if (msg.status === 200 || msg.status === 201) {
        // Send the message to the reciever in realtime
        io.to(socketId as string).emit(SocketEvents.EMIT_CHAT_RECIEVE_MESSAGE, {
          from: socket.data.user.userId,
          content,
        });
      } else {
        console.log("Error: ", msg.message);
      }
    } else {
      console.log("Message is undefined");
    }

    if (attachments) {
      //
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

// async function sendVideo(
//   from: string,
//   to: string,
//   video: Video
// ): Promise<{
//   status: number;
//   message?: string | null;
// }> {
//   try {
//     const newAudio = await Audios.create({
//       base64: audio.base64,
//       type: audio.type,
//     });

//     const msg = await Message.create({
//       audio: newAudio._id,
//       sender: from,
//     });

//     let pchat = await PrivateChat.findOne({
//       $or: [
//         { user1: from, user2: to },
//         { user1: to, user2: from },
//       ],
//     });

//     if (!pchat) {
//       pchat = await PrivateChat.create({
//         user1: from,
//         user2: to,
//         messages: [msg._id],
//       });

//       if (!pchat) {
//         return {
//           message: "Something went wrong trying to create a private chat",
//           status: 500,
//         };
//       }

//       return {
//         message: String(newAudio),
//         status: 201,
//       };
//     }

//     pchat.messages.push(msg._id);
//     await pchat.save();

//     return {
//       message: String(newAudio),
//       status: 201,
//     };
//   } catch (error) {
//     return { message: (error as Error).message, status: 500 };
//   }
// }
