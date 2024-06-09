import React from "react";
import { TUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";

type Props = {
  user: TUser;
  text: string;
  createdAt: Date;
};

function CommentCard({ user, text, createdAt }: Props) {
  console.log(Date.now());
  const createdAtTime = new Date(createdAt).toDateString().slice(0, 15);

  return (
    <div
      className={`flex  gap-2 p-2 h-fit   rounded-sm bg-neutral-50 border-[1px]  `}
    >
      <div className="relative h-full flex items-start">
        <Avatar>
          <AvatarImage
            src={user.profileUrl ?? "https://imgur.com/cAy8VXf.png"}
            width={200}
            height={200}
            className="bg-center object-cover !bg-cover"
          ></AvatarImage>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
      <div className="">
        <div className="font-opensans text-sm flex items-center">
          {user.firstName + " " + user.lastName}{" "}
          <Dot className="scale-50 opactiy-40" />
          <span className="text-xs opacity-40">{createdAtTime}</span>
        </div>
        <p className="opacity-80 text-sm font-opensans w-full ">{text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
