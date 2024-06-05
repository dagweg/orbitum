import { cn } from "@/lib/utils";
import { TChatProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";
import { send } from "process";

function ChatMessage({
  name,
  message,
  sender = "default",
  chatType = "private",
}: TChatProps) {
  return (
    <div
      className={cn(
        "px-2  py-1 w-full flex",
        sender === "default" ? "justify-start" : "justify-end"
      )}
    >
      <AvatarWrapper
        noavatar={sender === "you" || chatType === "private"}
        name={name}
        lineClamp="line-clamp-none"
        summary={message}
        className="p-2 !bg-white rounded-lg ring-neutral-200 w-fit shadow-sm font-semibold font-lato "
        chatType={chatType}
        sender={sender}
      />
    </div>
  );
}

export default ChatMessage;
