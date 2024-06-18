import { cn } from "@/lib/utils";
import { TChatProps } from "../types";
import AvatarWrapper from "./avatar-wrapper";
import { send } from "process";

function ChatMessage({
  name,
  message,
  sender = "default",
  chatType = "private",
  date,
}: TChatProps) {
  let dateModif = new Date(date?.toString() as string);
  let dateTimeSplit = dateModif.toLocaleTimeString().split(":");
  let dateTime = Array.prototype
    .concat(dateTimeSplit.slice(0, 2).join(":"), dateTimeSplit[2].split(" ")[1])
    .join(" ");

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
          className="p-2 !bg-white rounded-lg ring-neutral-200 w-fit z-0 "
          chatType={chatType}
          sender={sender}
          date={dateModif}
          dateType="timeAgo"
        />

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
