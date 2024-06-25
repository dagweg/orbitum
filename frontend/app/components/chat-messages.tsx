import { RootState } from "@/lib/redux/store";
import { TMessageSchema } from "@/lib/types/schema";
import React, { RefObject } from "react";
import { useSelector } from "react-redux";
import ChatMessage from "./chat-message";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

function ChatMessages({
  chatMessagesRef,
  messages,
}: {
  chatMessagesRef: RefObject<HTMLDivElement>;
  messages: TMessageSchema[] | undefined;
}) {
  if (!messages) {
    return (
      <div className="h-full  flex flex-col justify-center">
        <Badge className="mx-auto text-base rounded-sm bg-neutral-600 text-white">
          Get started by selecting a chat
        </Badge>
      </div>
    );
  }

  return messages.length === 0 ? (
    <div className="flex-1  flex flex-col gap-3 justify-center items-center ">
      <Image
        src={"https://imgur.com/qdTUw3U.png"}
        className="rounded-lg "
        width={200}
        height={200}
        alt="ola"
      ></Image>
      Get started by saying hi.
    </div>
  ) : (
    <section
      ref={chatMessagesRef}
      className="h-full  overflow-y-scroll overflow-x-clip no-scrollbar  mb-[50px]"
    >
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
    </section>
  );
}

export default ChatMessages;
