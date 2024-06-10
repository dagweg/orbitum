import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import OnlineIndicator from "./online-indicator";

type TChatCardProps = {
  name: string;
  recentMessage?: string;
  profileUrl?: string;
  isOnline?: boolean;
  onClick?: () => void;
};

function ChatCard({
  name,
  recentMessage,
  profileUrl,
  isOnline = false,
  onClick,
}: TChatCardProps) {
  return (
    <div
      className={`flex items-center  gap-2 p-2 h-[65px] border-b-[1px] hover:bg-neutral-50 cursor-pointer  border-neutral-200 `}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage
            src={profileUrl ?? "https://imgur.com/cAy8VXf.png"}
            width={200}
            height={200}
            className="bg-center object-cover !bg-cover"
          ></AvatarImage>
          <AvatarFallback></AvatarFallback>
        </Avatar>
        {isOnline && (
          <OnlineIndicator className="left-[-4px] top-[0px] right-auto" />
        )}
      </div>
      <div className="">
        <div className="font-lato">{name}</div>
        <p className="opacity-50 text-sm font-lato w-full line-clamp-1">
          {recentMessage ?? "Recent Message is hidden"}
        </p>
      </div>
    </div>
  );
}

export default ChatCard;
