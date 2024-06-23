import { RootState } from "@/lib/redux/store";
import { TMessageSchema } from "@/lib/types/schema";
import React from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./chat-message";

function ChatMessages({ messages }: { messages: TMessageSchema[] }) {
  return (
    <>
      {messages &&
        messages.map((message: TMessageSchema, index) => (
          <ChatMessage
            key={index}
            name={message.sender.userName}
            message={message.content as string}
            sender={message.you ? "you" : "default"}
            date={message.date}
          />
        ))}
    </>
  );
}

export default ChatMessages;
