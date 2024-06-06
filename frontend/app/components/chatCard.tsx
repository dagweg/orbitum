import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type TChatCardProps = {
  name: string;
  recentMessage?: string;
  profileUrl?: string;
  onClick?: () => void;
};

function ChatCard({
  name,
  recentMessage,
  profileUrl,
  onClick,
}: TChatCardProps) {
  return (
    <div
      className={`flex items-center gap-2 p-2 h-[65px] border-[1px] hover:bg-neutral-50 cursor-pointer  border-neutral-200 `}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage
          src={profileUrl ?? "https://imgur.com/0omjre2.png"}
          width={200}
          height={200}
        ></AvatarImage>
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="">
        <div className="font-lato">{name}</div>
        <p className="opacity-50 text-sm font-lato">
          {recentMessage ?? "Recent Message is hidden"}
        </p>
      </div>
    </div>
  );
}

export default ChatCard;
