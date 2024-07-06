import { useSelector } from "react-redux";
import { useChatSocket } from "./useChatSocket";
import { RootState } from "@/lib/redux/store";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import socket from "@/lib/socket";
import { arrayBuffertoBase64, base64ToBlob } from "@/util/file";
import { TAudio } from "../types";

export function useChatInput(
  message: string,
  setMessage: Dispatch<SetStateAction<string>>,
  chatTextAreaRef: RefObject<HTMLTextAreaElement>
) {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const [isRecording, setIsRecording] = useState(false);

  const { refreshChat, setHasStartedTyping, hasStartedTyping } =
    useChatSocket();

  let keys = {
    enter: false,
    leftShift: false,
  };

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setHasStartedTyping({ ...hasStartedTyping, you: true });
    } else {
      setHasStartedTyping({ ...hasStartedTyping, you: false });
    }
    socket.emit("chat:type", {
      to: chatArea.currentChat?.recipientId,
    });
  }

  function handleTextAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      keys.enter = true;
    }

    if (e.code === "ShiftLeft") {
      keys.leftShift = true;
    }

    if (keys.enter && keys.leftShift) {
      // Send Message Here
      handleMessageSend();
      if (chatTextAreaRef && chatTextAreaRef.current)
        chatTextAreaRef.current.value = "";
    }
  }

  function handleTextAreaKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      keys.enter = false;
    }

    if (e.code === "ShiftLeft") {
      keys.leftShift = false;
    }
  }

  function handleMessageSend() {
    console.log(message);
    if (chatArea.currentChat) {
      socket.emit("chat:sendMessage", {
        to: chatArea.currentChat.recipientId,
        message,
      });

      setTimeout(() => refreshChat(), 50);
    }
    setMessage("");
  }

  return {
    isRecording,
    setIsRecording,
    setHasStartedTyping,
    hasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,

    handleMessageSend,
  };
}
