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

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.chatAreaReducer);

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
    <div
      className={cn(
        "flex-1 flex flex-col h-full w-full max-w-[1000px] mx-auto bg-neutral-100 p-4",
        chatArea.enabled
          ? `${chatArea.enabledStyle}`
          : `${chatArea.disabledStyle}`
      )}
    >
      <section className="flex-1">
        <ChatMessage
          name="Dagmawi Tefera"
          message="Hey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing"
        />
        <ChatMessage
          name="You"
          sender="you"
          message="I'm doing great. You? 😁"
        />
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
    </div>
  );
}

export default ChatArea;
