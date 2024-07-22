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
import { Notification } from "../../notification";

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
        console.log(
          "Couldn't find user with that Socket User Id. He/She is disconnected"
        );
      }

      let message;

      const sender = socket.data.user.userId;
      const receiver = new ObjectId(to);

      if (attachment && attachment.length > 0 && content) {
        /**
         * Handle case where both attachment and content (message) are provided
         */

        const { fileIds } = await new Attachments().createAttachment(
          attachment
        );
        if (fileIds) {
          message = await new Message().createMessageWithAttachment(
            fileIds,
            sender,
            content
          );
        } else {
          throw new Error("File Ids not found");
        }
      } else if (attachment && attachment.length > 0) {
        /**
         * Handle case where only attachment is provided without any content (message)
         */

        const { fileIds } = await new Attachments().createAttachment(
          attachment
        );

        if (fileIds) {
          message = await new Message().createMessageWithAttachment(
            fileIds,
            sender
          );
        } else {
          throw new Error("File Ids not found!");
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
        console.log(message);
      } else {
        throw new Error("No message provided");
      }

      if (!message?.id) throw new Error("Message Id not found");

      const privateChat = await new PrivateChat().privateChatMessagePush(
        sender,
        receiver,
        message.id
      );

      // console.log(privateChat);
      // const newNotification = await new Notification().createNotficiation(
      //   receiver,
      //   `You have a new ${audio ? "audio " : video ? "video " : ""}message`,
      //   `${
      //     audio ? "Listen to the audio" : video ? "Watch the video" : content
      //   }.`,
      //   "this-is-supposed-to-be-a-link"
      // );

      // console.log(
      //   "THis is the new notification \n",
      //   newNotification.notification
      // );

      if (message && socketId) {
        console.log("SENDING THIS TO USER ", message);
        io.to(socketId).emit(SocketEvents.EMIT_CHAT_RECEIVE_MESSAGE, {
          from: socket.data.user.userId,
          content,
          audio,
          video,
          attachment,
        });
        // if (newNotification.notification) {
        //   io.to(socketId).emit(SocketEvents.EMIT_NOTIFICATION, {
        //     from: socket.data.user.userId,
        //     notification: newNotification.notification,
        //   });
        // } else {
        //   console.log("Notification not sent! Plase check the controller");
        // }
      } else {
        console.log("Message is undefined or socketId is undefined");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };
