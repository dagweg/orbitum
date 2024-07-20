import Image from "next/image";
import React from "react";
import OnlineIndicator from "./online-indicator";
import { PulseLoader } from "react-spinners";
import { TMessage, TUser } from "../types";
import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { createUrl } from "@/util/file";
import { TMessageSchema } from "@/lib/types/schema";
import { User } from "lucide-react";

function ChatHeader({
  onlineUsers,
  messages,
  recipient,
  hasStartedTyping,
}: {
  messages: TMessage[] | undefined;
  onlineUsers: {};
  recipient: TUser | undefined;
  hasStartedTyping: {
    recipient: boolean;
  };
}) {
  let profileUrl;
  if (recipient && recipient.profilePicture) {
    const { type, base64 } = recipient.profilePicture;
    profileUrl = createUrl(base64, type);
  }

  const isOnline = onlineUsers && (recipient?._id as string) in onlineUsers;
  return (
    messages && (
      <div className=" w-full h-fit  p-2 sticky top-0 bg-white ">
        <div className="flex justify-between h-fit">
          <div className="flex  gap-2 ">
            <div className="relative  w-[50px] aspect-square max-w-[50px] flex items-center justify-center">
              {
                profileUrl ? 
                <Image
                src={profileUrl}
                alt="prof"
                width={5}
                height={5}
                className="object-cover  w-[50px] aspect-square min-w-[50px] rounded-xl"
              ></Image>
              :
              <User className="w-full h-full p-2"/>
              }
              {isOnline && <OnlineIndicator />}
            </div>
            <span className="w-fit">
              {recipient?.firstName} {recipient?.lastName} <br />
              <span className="text-sm opacity-45">
                {hasStartedTyping.recipient ? (
                  <>
                    <PulseLoader color="black" size={5} speedMultiplier={0.7} />{" "}
                    typing
                  </>
                ) : isOnline ? (
                  "Online"
                ) : (
                  "Last seen recently"
                )}
              </span>
            </span>
          </div>
          <div className="my-auto">
            <Button variant={"squareGhost"} className="text-2xl">
              <IoMdMore />
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

export default ChatHeader;
