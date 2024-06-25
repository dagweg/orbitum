import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import ChatTextArea from "./chat-text-area";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useChatSocket } from "../hooks/useChatSocket";

export function ChatInput({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const { refreshChat, setHasStartedTyping, hasStartedTyping } =
    useChatSocket();

  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

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
    setMessage("");
    if (chatArea.currentChat) {
      socket.emit("chat:sendMessage", {
        to: chatArea.currentChat.recipientId,
        message,
      });

      setTimeout(() => refreshChat(), 50);
    }
  }

  function handleMicRecord() {}

  return (
    <ChatTextArea
      handleMicRecord={handleMicRecord}
      message={message}
      setMessage={setMessage}
      chatTextAreaRef={chatTextAreaRef}
      handleMessageSend={handleMessageSend}
      handleTextAreaChange={handleTextAreaChange}
      handleTextAreaKeyDown={handleTextAreaKeyDown}
      handleTextAreaKeyUp={handleTextAreaKeyUp}
      hasStartedTyping={hasStartedTyping}
    />
  );
}
