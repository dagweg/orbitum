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
import { ChangeEvent, useEffect, useState } from "react";
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

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
    if (e.target.value.length > 0) {
      setHasStartedTyping(true);
    } else {
      setHasStartedTyping(false);
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
      })

      setTimeout(() => refreshChat(), 1000)
    }
  }

  useSocket("chat:receiveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
    refreshChat()
  });

  useEffect(() => {
    socket.emit("user:connect");
  }, []);

  return (
    <>
      <div className="flex-1 p-4 w-full  max-w-[1000px] flex flex-col items-center  justify-center mx-auto">
        {!messages ? (
          <Badge className="mx-auto text-base">
            Get started by selecting a chat
          </Badge>
        ) : (
          <div
            className={cn(
              " flex flex-col !h-full justify-between  mx-auto bg-neutral-100 ",
              chatArea.enabled
                ? `${chatArea.enabledStyle}`
                : `${chatArea.disabledStyle}`
            )}
          >
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
              <section className="flex-1">
                <p className="sr-only">This is where you populate the chat</p>
                {messages &&
                  messages.map((message: TMessageSchema, index) => (
                    <ChatMessage
                      name={message.sender.userName}
                      message={message.content as string}
                      sender={message.you ? "you" : "default"}
                    />
                  ))}
              </section>
            )}
            <section className="h-fit sticky bottom-0 w-full flex flex-col-reverse">
              <div className="flex items-end justify-around gap-4 bg-white w-fit p-4 mx-auto mb-5 ring-2 ring-neutral-200 rounded-lg">
                <Paperclip className="" />
                <TextAreaAutoSize
                  maxRows={10}
                  className="w-fit sm:w-[500px] outline-none rounded-lg no-scrollbar md:scrollbar resize-none"
                  placeholder="Type a message"
                  onChange={(e) => handleTextAreaChange(e)}
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
    </>
  );
}

export default ChatArea;
