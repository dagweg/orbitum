import Image from "next/image";
import React from "react";
import OnlineIndicator from "./online-indicator";
import { PulseLoader } from "react-spinners";
import { TMessage, TUser } from "../types";
import { IoMdMore } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { createUrl } from "@/util/file";
import { TMessageSchema } from "@/lib/types/schema";

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
  if (recipient) {
    const { type, base64 } = recipient.profilePicture;
    profileUrl = createUrl(base64, type);
  }

  const isOnline = onlineUsers && (recipient?._id as string) in onlineUsers;
  return (
    messages && (
      <div className=" w-full h-fit  p-2 sticky top-0 bg-white ">
        <div className="flex justify-between h-fit">
          <div className="flex  gap-2 ">
            <div className="relative ">
              <Image
                src={profileUrl ?? "https://imgur.com/mkrjkrY.png"}
                alt="prof"
                width={5}
                height={5}
                className="rounded-xl  w-[50px] aspect-square min-w-[50px]  max-w-[50px] object-cover "
              ></Image>
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
