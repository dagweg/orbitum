"use client";

import { cn } from "@/lib/utils";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import { useChatSocket } from "../hooks/useChatSocket";
import { ChatInput } from "./chat-input";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const { onlineUsers } = useSelector(
    (state: RootState) => state.ChatSideBar.chat
  );

  const { hasStartedTyping } = useChatSocket();

  const messages = chatArea.currentChat
    ? chatArea.currentChat.messages
    : undefined;

  const [message, setMessage] = useState<string>("");

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  let recipient = chatArea.currentChat?.recipient;

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
              <ChatInput message={message} setMessage={setMessage} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatArea;
