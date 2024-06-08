import React from "react";
import { TUser } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  user: TUser;
  text: string;
};

function CommentCard({ user, text }: Props) {
  return (
    <div
      className={`flex  gap-2 p-2 h-fit   border-b-2 border-opacity-30  rounded-sm shadow-sm `}
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
        <div className="font-opensans text-sm">
          {user.firstName + " " + user.lastName}
        </div>
        <p className="opacity-80 text-sm font-opensans w-full ">{text}</p>
      </div>
    </div>
  );
}

export default CommentCard;
