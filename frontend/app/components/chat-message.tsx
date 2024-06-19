import { cn, getTime2 } from "@/lib/utils";
import { TChatProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";
import { send } from "process";
import { Check, CheckCheck, Clock, Timer } from "lucide-react";

function ChatMessage({
  name,
  message,
  sender = "default",
  chatType = "private",
  date,
}: TChatProps) {
  let dateModif = new Date(date?.toString() as string);
  let dateTime = getTime2(dateModif);

  return (
    <div
      className={cn(
        "px-2  py-1 w-full flex ",
        sender === "default" ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "flex flex-col relative",
          sender === "you" ? "items-end" : "items-start"
        )}
      >
        <AvatarWrapper
          noavatar={sender === "you" || chatType === "private"}
          name={name}
          lineClamp="line-clamp-none"
          summary={message}
          className="p-2 pb-4 !bg-white rounded-lg ring-neutral-200 w-fit z-0 "
          chatType={chatType}
          sender={sender}
          date={dateModif}
          dateType="timeAgo"
        />
        <span className="absolute bottom-[18px] px-2 flex flex-col items-center justify-center text-[8pt]  ">
          <CheckCheck className="seen" size={13} opacity={0.5} />
          {/* <Check className="sent" size={13} opacity={0.5} /> */}
          {/* <Clock className="pending" size={10} opacity={0.5} /> */}
        </span>
        <span
          className={cn(
            "font-light text-xs opacity-50 w-full px-1",
            sender === "you" ? "text-right" : "text-left"
          )}
        >
          {dateTime}
        </span>

        <div
          className={cn(
            " w-4 scale-x-[1.9] bg-white aspect-square absolute  top-0 z-0",
            sender === "you"
              ? "-right-4 rounded-br-full"
              : "-left-4 rounded-bl-full"
          )}
        ></div>
        <div
          className={cn(
            " w-4 bg-neutral-200 aspect-square absolute   top-0 z-0 rotate-180",
            sender === "you"
              ? "-right-4 rounded-br-full"
              : "-left-4 rounded-bl-full"
          )}
        ></div>
      </div>
    </div>
  );
}

export default ChatMessage;
