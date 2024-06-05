"use client";

import { cn } from "@/lib/utils";
import ChatMessage from "./chat-message";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import TextAreaAutoSize from "react-textarea-autosize";
import {
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

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);

  const dispatch = useDispatch<AppDispatch>();

  const messages = chatArea.currentChat
    ? chatArea.currentChat.messages
    : undefined;

  const [message, setMessage] = useState<string>("");

  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
    if (e.target.value.length > 0) {
      setHasStartedTyping(true);
    } else {
      setHasStartedTyping(false);
    }
  }

  let keys = {
    enter: false,
    leftShift: false,
  };

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

  function refreshChat() {
    if (chatArea.currentChat)
      dispatch(
        setCurrentChat({
          id: chatArea.currentChat.recipientId,
        })
      );
  }

  function handleMessageSend() {
    console.log(message);

    if (chatArea.currentChat) {
      socket.emit("chat:sendMessage", {
        to: chatArea.currentChat.recipientId,
        message,
      });

      setTimeout(() => refreshChat(), 1000);
    }
  }

  useSocket("chat:receiveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
    refreshChat();
  });

  useEffect(() => {
    socket.emit("user:connect");
  }, []);

  const recipient = chatArea.currentChat?.recipient;

  return (
    <>
      <div
        className={cn(
          "flex-1  w-full border-l-2 border-t-2 h-full  rounded-lg rounded-b-none  bg-neutral-100 flex flex-col items-center  justify-start ",
          chatArea.enabled
            ? `${chatArea.enabledStyle}`
            : `${chatArea.disabledStyle}`
        )}
      >
        {messages && messages.length !== 0 && (
          <div className="h-[50px] w-full bg-white p-2 sticky top-0">
            <span>
              {recipient?.firstName} {recipient?.lastName} <br />
              <span className="text-sm opacity-45">Last seen recently</span>
            </span>
          </div>
        )}
        <div className="w-full flex-1 flex flex-col  justify-center h-full px-2 md:px-10">
          {!messages ? (
            <Badge className="mx-auto text-base">
              Get started by selecting a chat
            </Badge>
          ) : (
            <div className={cn(" flex flex-col  justify-between  mx-auto ")}>
              {messages.length === 0 ? (
                <div className="flex-1  flex flex-col gap-3 justify-center items-center">
                  <Image
                    src={"https://imgur.com/wnW8YPI.png"}
                    className="rounded-lg "
                    width={200}
                    height={200}
                    alt="ola"
                  ></Image>
                  Get started by saying hi.
                </div>
              ) : (
                <section className="flex-1 ">
                  <div className="overflow-y-scroll no-scrollbar flex flex-col">
                    {messages &&
                      messages.map((message: TMessageSchema, index) => (
                        <ChatMessage
                          name={message.sender.userName}
                          message={message.content as string}
                          sender={message.you ? "you" : "default"}
                        />
                      ))}
                  </div>
                </section>
              )}
              <section className="h-fit sticky bottom-0 w-full flex flex-col-reverse">
                <div className="flex items-end justify-around gap-4 bg-white w-fit p-4 mx-auto mb-5 ring-2 ring-neutral-200 rounded-lg">
                  <Paperclip className="" />
                  <TextAreaAutoSize
                    maxRows={10}
                    ref={chatTextAreaRef}
                    className="w-fit sm:w-[500px] outline-none rounded-lg no-scrollbar md:scrollbar resize-none"
                    placeholder="Type a message"
                    onChange={(e) => handleTextAreaChange(e)}
                    onKeyDown={(e) => handleTextAreaKeyDown(e)}
                    onKeyUp={(e) => handleTextAreaKeyUp(e)}
                  />
                  <Smile />
                  {hasStartedTyping ? (
                    <SendHorizontal onClick={handleMessageSend} />
                  ) : (
                    <Mic />
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatArea;
