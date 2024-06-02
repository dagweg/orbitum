"use client";

import { cn } from "@/lib/utils";
import ChatMessage from "./chat-message";
import AvatarWrapper from "./avatar-wrapper";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TextAreaAutoSize from "react-textarea-autosize";
import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TMessageSchema } from "@/lib/types/schema";
import useSocket from "../hooks/useSocket";
import socket from "@/lib/socket";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);

  const dispatch = useDispatch<AppDispatch>();

  const messages = chatArea.currentChat.messages;

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

  function handleMessageSend() {
    console.log(message);

    socket.emit("chat:sendMessage", {
      to: chatArea.currentChat.recipientId,
      message,
    });
  }

  useSocket("chat:recieveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
  });

  useEffect(() => {
    // console.log(chatArea.currentChat);
    socket.emit("user:connect");
  }, []);

  return (
    <>
      <div className="flex-1 p-4 w-full max-w-[1000px] flex flex-col items-center  justify-center mx-auto">
        {messages && messages.length === 0 ? (
          <Badge className="mx-auto text-base">
            Get started by selecting a chat
          </Badge>
        ) : (
          <div
            className={cn(
              " flex flex-col h-full  mx-auto bg-neutral-100 ",
              chatArea.enabled
                ? `${chatArea.enabledStyle}`
                : `${chatArea.disabledStyle}`
            )}
          >
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
