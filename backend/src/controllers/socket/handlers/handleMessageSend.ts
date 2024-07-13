import { Server as SocketIOServer } from "socket.io";
import { Socket } from "socket.io";
import SocketEvents from "../../../config/socketEvents";
import { TMessagePayload } from "../../../types/types";
import Attachments from "../../attachments";
import { Message } from "../../message";
import { Audio } from "../../audio";
import { Video } from "../../video";
import { PrivateChat } from "../../privateChat";
import { ObjectId } from "mongodb";

/**
 *
 * @param io
 * @param socket
 * @param userMap
 * @returns callback
 */
export const handleMessageSend =
  (io: SocketIOServer, socket: Socket, userMap: Map<string, string>) =>
  async ({ to, content, audio, video, attachment }: TMessagePayload) => {
    try {
      console.log("\nUsermap is ", userMap, "\n");
      console.log("SENDING MESSAGE TO ", to);
      console.log("MESSAGE IS ", content);
      console.log("AUDIO IS ", audio);
      console.log("VIDEO IS ", video);
      console.log("ATTACHMENT IS ", attachment);

      const socketId = userMap.get(to);
      console.log("Socket ID is ", socketId);

      if (!socketId) {
        console.log("Couldn't find user with that UserID");
        return;
      }

      let message;

      const sender = socket.data.user.userId;
      const reciever = new ObjectId(to);

      if (JSON.stringify(attachment) !== "{}" && attachment && content) {
        const { attachmentId } = await new Attachments().createAttachment(
          attachment
        );
        if (attachmentId) {
          message = await new Message().createMessageWithAttachment(
            content,
            attachmentId,
            sender
          );
        } else {
          throw new Error("Attachment Id not found");
        }
      } else if (audio) {
        const audioId = (
          await new Audio().createAudio(audio.type, audio.base64)
        ).id;
        if (audioId) {
          message = await new Message().createAudioMessage(audioId, sender);
        } else {
          throw new Error("Audio Id not found");
        }
      } else if (video) {
        const videoId = (
          await new Video().createVideo(video.type, video.base64)
        ).id;
        if (videoId) {
          message = await new Message().createVideoMessage(videoId, sender);
        } else {
          throw new Error("Video Id not found");
        }
      } else if (content) {
        message = await new Message().createMessage(content, sender);
        if (!message) throw new Error("Message not found");
      } else {
        throw new Error("No message provided");
      }

      if (!message?.id) throw new Error("Message Id not found");

      const privateChat = await new PrivateChat().privateChatMessagePush(
        sender,
        reciever,
        message.id
      );

      if (message) {
        console.log("SENDING THIS TO USER ", message);
        io.to(socketId).emit(SocketEvents.EMIT_CHAT_RECIEVE_MESSAGE, {
          from: socket.data.user.userId,
          content,
          audio,
          video,
          attachment,
        });
      } else {
        console.log("Message is undefined");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
