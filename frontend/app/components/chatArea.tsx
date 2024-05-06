"use client";

import { cn } from "@/lib/utils";
import ChatMessage from "./chat-message";
import AvatarWrapper from "./avatar-wrapper";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

function ChatArea() {
  const chatArea = useSelector((state: RootState) => state.chatAreaReducer);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      className={cn(
        "flex-1 flex h-full bg-neutral-500",
        chatArea.enabled
          ? `${chatArea.enabledStyle}`
          : `${chatArea.disabledStyle}`
      )}
    >
      <section>
        <ChatMessage
          name="Dagmawi Tefera"
          message="Hey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing"
        />
        <AvatarWrapper name="You" summary="I'm doing great... you?  " />
      </section>
    </div>
  );
}

export default ChatArea;
