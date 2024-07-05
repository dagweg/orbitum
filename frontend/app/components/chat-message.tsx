import { cn, getTime2 } from "@/lib/utils";
import { TChatProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";
import { send } from "process";
import { Check, CheckCheck, Clock, Timer } from "lucide-react";

function ChatMessage({
  name,
  message,
  sender = "default",
  audio,
  chatType = "private",
  date,
}: TChatProps) {
  let dateModif = getTime2(new Date(date?.toString() as string));

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
        <div className="relative">
          <div
            className={cn(
              `relative  z-10 flex items-start justify-start gap-2 rounded-lg `
            )}
          >
            <span
              className={cn(`text-sm  max-w-prose flex flex-col gap-[-1px]`)}
            >
              {message}
            </span>
          </div>
        </div>
      </div>
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
        {dateModif}
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
  );
}

export default ChatMessage;
