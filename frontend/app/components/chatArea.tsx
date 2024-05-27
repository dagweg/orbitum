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
import { ChangeEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);

  const dispatch = useDispatch<AppDispatch>();

  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > 0) {
      setHasStartedTyping(true);
    } else {
      setHasStartedTyping(false);
    }
  }

  return (
    <>
      <div className="flex-1 p-4 w-full max-w-[1000px] flex flex-col items-center  justify-center mx-auto">
        <Badge className="mx-auto text-base">
          Get started by selecting a chat
        </Badge>
        {/* <div
          className={cn(
            " flex flex-col h-full  mx-auto bg-neutral-100 ",
            chatArea.enabled
              ? `${chatArea.enabledStyle}`
              : `${chatArea.disabledStyle}`
          )}
        >
          <section className="flex-1">
            <p className="sr-only">This is where you populate the chat</p>
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
              {hasStartedTyping ? <SendHorizontal /> : <Mic />}
            </div>
          </section>
        </div> */}
      </div>
    </>
  );
}

export default ChatArea;
