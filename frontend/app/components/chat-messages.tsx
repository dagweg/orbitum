import { RootState } from "@/lib/redux/store";
import { TMessageSchema } from "@/lib/types/schema";
import React from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./chat-message";

function ChatMessages({ messages }: { messages: TMessageSchema[] }) {
  return (
    <div className="h-full overflow-y-scroll no-scrollbar flex flex-col">
      {messages &&
        messages.map((message: TMessageSchema, index) => (
          <ChatMessage
            name={message.sender.userName}
            message={message.content as string}
            sender={message.you ? "you" : "default"}
            date={message.date}
          />
        ))}
    </div>
  );
}

export default ChatMessages;
