import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import OnlineIndicator from "./online-indicator";
import { getTime2 } from "@/lib/utils";

type TChatCardProps = {
  name: string;
  recentMessage?: string;
  profilePicture?: string;
  isOnline?: boolean;
  date: Date;
  onClick?: () => void;
};

function ChatCard({
  name,
  recentMessage,
  date,
  profilePicture,
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
            src={profilePicture ?? "https://imgur.com/mkrjkrY.png"}
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
      <div className="w-full">
        <div className="font-workSans opacity-70">{name}</div>
        <p className="opacity-40 text-sm font-lato w-full line-clamp-1 flex justify-between ">
          <span>{recentMessage ?? "Recent Message is hidden"}</span>
          <span className="text-xs ">{getTime2(new Date(date as any))}</span>
        </p>
      </div>
    </div>
  );
}

export default ChatCard;
