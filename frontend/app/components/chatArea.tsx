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

import sprinkleWallpaper from "@/public/images/chat/Sprinkle.svg";
import { Button } from "@/components/ui/button";

import { PulseLoader, SyncLoader } from "react-spinners";
import OnlineIndicator from "./online-indicator";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const { onlineUsers } = useSelector(
    (state: RootState) => state.ChatSideBar.chat
  );

  const dispatch = useDispatch<AppDispatch>();

  const messages = chatArea.currentChat
    ? chatArea.currentChat.messages
    : undefined;

  const [message, setMessage] = useState<string>("");

  const [hasStartedTyping, setHasStartedTyping] = useState({
    you: false,
    recipient: false,
  });

  const [user, setUser] = useState({
    connected: false,
  });

  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
    if (e.target.value.length > 0) {
      setHasStartedTyping({ ...hasStartedTyping, you: true });
    } else {
      setHasStartedTyping({ ...hasStartedTyping, you: false });
    }

    socket.emit("chat:type", {
      to: chatArea.currentChat?.recipientId,
    });
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

      setTimeout(() => refreshChat(), 50);
    }
  }

  useSocket("chat:receiveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
    refreshChat();
  });

  const typingTimeout = useRef(setTimeout(() => {}));

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

  const recipient = chatArea.currentChat?.recipient;
  console.log(recipient?._id);
  return (
    <>
      <div
        className={cn(
          "flex-1  w-full border-l-2 h-full  rounded-none !bg-neutral-300 sticky bottom-0   overflow-clip   flex flex-col items-center  justify-start ",
          chatArea.enabled
            ? `${chatArea.enabledStyle}`
            : `${chatArea.disabledStyle}`
        )}
      >
        {sprinkleWallpaper && (
          <Image
            src={sprinkleWallpaper}
            alt="wallpaper"
            className="absolute w-full h-full object-fit z-[-1] opacity-20 bg-current "
          />
        )}
        {messages && messages.length !== 0 && (
          <div className=" w-full h-fit  p-2 sticky top-0 bg-white">
            <div className="flex  gap-2">
              <div className="relative ">
                <Image
                  src={recipient?.profileUrl ?? "https://imgur.com/cAy8VXf.png"}
                  alt="prof"
                  width={50}
                  height={50}
                  className="rounded-sm"
                ></Image>
                {onlineUsers && (recipient?._id as string) in onlineUsers && (
                  <OnlineIndicator />
                )}
              </div>
              <span className="w-fit">
                {recipient?.firstName} {recipient?.lastName} <br />
                <span className="text-sm opacity-45">
                  {hasStartedTyping.recipient ? (
                    <>
                      <PulseLoader
                        color="black"
                        size={5}
                        speedMultiplier={0.7}
                      />{" "}
                      typing
                    </>
                  ) : (
                    "Last seen recently"
                  )}
                </span>
              </span>
            </div>
          </div>
        )}
        <div className="w-full flex-1 flex flex-col  justify-center h-full ">
          {!messages ? (
            <Badge className="mx-auto text-base">
              Get started by selecting a chat
            </Badge>
          ) : (
            <div className="h-full  p-4 flex flex-col gap-3">
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
                <section className="flex-1 h-full  pb-44">
                  <div className="h-full overflow-y-scroll no-scrollbar flex flex-col">
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
              <section className="h-fit sticky bottom-0 w-[95%] md:w-[80%] mx-auto max-w-[700px] flex flex-col-reverse">
                <div className="flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto mb-5 ring-2 ring-neutral-200 rounded-lg">
                  <div className="h-full flex flex-col-reverse items-end">
                    <Button variant={"circleGhost"}>
                      <Paperclip className="" />
                    </Button>
                  </div>
                  <TextAreaAutoSize
                    maxRows={10}
                    ref={chatTextAreaRef}
                    className=" outline-none rounded-lg no-scrollbar md:scrollbar resize-none"
                    placeholder="Type a message"
                    onChange={(e) => handleTextAreaChange(e)}
                    onKeyDown={(e) => handleTextAreaKeyDown(e)}
                    onKeyUp={(e) => handleTextAreaKeyUp(e)}
                    style={{ width: "100%" }}
                  />
                  <div className="h-full flex flex-col-reverse items-end">
                    <div className="flex items-end">
                      <Button variant={"circleGhost"}>
                        <Smile />
                      </Button>
                      <Button
                        onClick={
                          hasStartedTyping ? handleMessageSend : () => {}
                        }
                        variant={"circleGhost"}
                      >
                        {hasStartedTyping ? <SendHorizontal /> : <Mic />}
                      </Button>
                    </div>
                  </div>
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
