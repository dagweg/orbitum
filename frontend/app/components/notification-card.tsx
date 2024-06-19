import { timeAgo } from "@/util/time";
import Image from "next/image";
import React from "react";

type Titles =
  | "Someone just liked your post"
  | "Someone reacted to your post"
  | "Someone commented on your post"
  | "Someone sent you a friend request"
  | "Someone started a livestream";

type TNotifProps = {
  title: Titles;
  description?: string;
  imgSrc?: string;
  date?: Date;
};
function NotificationCard({ title, description, imgSrc, date }: TNotifProps) {
  return (
    <div className="w-full py-2 relative overflow-hidden px-4 flex gap-2 h-[75px]  bg-neutral-50 ring-0 active:ring-2 ring-neutral-400 rounded-md shadow-sm border border-1 cursor-pointer hover:bg-white duration-300">
      <div className="flex-1">
        <h1 className="font-semibold opacity-80 text-sm">{title}</h1>
        <p className="text-xs font-semibold opacity-60">{description}</p>
        {date && (
          <span className="text-xs opacity-80">
            {timeAgo(date.toISOString())}
          </span>
        )}
      </div>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt="notif"
          width={150}
          height={150}
          className="w-[100px] h-full absolute right-0 top-0 bottom-0 p-2 object-cover   rounded-sm "
        ></Image>
      )}
    </div>
  );
}

export default NotificationCard;
