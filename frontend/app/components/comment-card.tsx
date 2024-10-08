import React from "react";
import { TUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, User } from "lucide-react";
import { createUrl } from "@/util/file";

type Props = {
  user: TUser;
  text: string;
  createdAt: Date;
};

function CommentCard({ user, text, createdAt }: Props) {
  console.log(Date.now());
  const createdAtTime = new Date(createdAt).toDateString().slice(0, 15);
  const profilePic = user.profilePicture
    ? createUrl(user.profilePicture.base64, user.profilePicture.type)
    : undefined;
  return (
    <div className={`flex  gap-2 p-2 h-fit   rounded-sm bg-neutral-50   `}>
      <div className="relative h-full flex items-start">
        <Avatar>
          <AvatarImage
            src={profilePic}
            width={200}
            height={200}
            className="bg-center object-cover !bg-cover"
          ></AvatarImage>
          <AvatarFallback><User /></AvatarFallback>
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
