"use client";

import { cn } from "@/lib/utils";
import ChatMessage from "./chat-message";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import TextAreaAutoSize from "react-textarea-autosize";
import {
  Circle,
  CircleDot,
  Dot,
  HelpCircleIcon,
  Mic,
  Paperclip,
  SendHorizontal,
  Smile,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TMessageSchema } from "@/lib/types/schema";
import useSocket from "../hooks/useSocket";
import socket from "@/lib/socket";
import { setCurrentChat } from "@/lib/redux/slices/chat/chatThunks";
import Image from "next/image";

import abstract from "@/public/images/chat/abstract.jpg";
import { Button } from "@/components/ui/button";

import { PulseLoader, SyncLoader } from "react-spinners";
import OnlineIndicator from "./online-indicator";
import ChatWallpaper from "./chat-wallpaper";
import ChatHeader from "./chat-header";
import ChatTextArea from "./chat-text-area";
import ChatMessages from "./chat-messages";
import { createUrl } from "@/util/file";
import { useChatSocket } from "../hooks/useChatSocket";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const { onlineUsers } = useSelector(
    (state: RootState) => state.ChatSideBar.chat
  );

  const dispatch = useDispatch<AppDispatch>();

  const { hasStartedTyping, refreshChat, setHasStartedTyping } =
    useChatSocket();

  const messages = chatArea.currentChat
    ? chatArea.currentChat.messages
    : undefined;

  const [message, setMessage] = useState<string>("");

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  let keys = {
    enter: false,
    leftShift: false,
  };

  const typingTimeout = useRef(setTimeout(() => {}));

  let recipient = chatArea.currentChat?.recipient;

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

  useSocket("chat:receiveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
    refreshChat();
  });

  useSocket("chat:type", (from) => {
    console.log("tyPING", from);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setHasStartedTyping((prev) => ({ ...prev, recipient: true }));

    typingTimeout.current = setTimeout(() => {
      setHasStartedTyping((prev) => ({ ...prev, recipient: false }));
    }, 1000);
  });

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div
        className={cn(
          "flex-1  w-full border-l-2 h-full  rounded-none !bg-neutral-200 sticky    overflow-clip   flex flex-col items-center  justify-start ",
          chatArea.enabled
            ? `${chatArea.enabledStyle}`
            : `${chatArea.disabledStyle}`
        )}
      >
        {/* <ChatWallpaper wallpaper={abstract} /> */}
        <ChatHeader
          messages={messages}
          hasStartedTyping={hasStartedTyping}
          onlineUsers={onlineUsers}
          recipient={recipient}
        />
        <div className="w-full  flex-1 flex flex-col  justify-center h-full ">
          <div className="h-full flex-1 flex flex-col gap-3">
            <ChatMessages
              chatMessagesRef={chatMessagesRef}
              messages={messages}
            />
            {messages && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatArea;
