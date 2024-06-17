import Image from "next/image";
import React from "react";
import OnlineIndicator from "./online-indicator";
import { PulseLoader } from "react-spinners";
import { TUser } from "../types";
import { createUrl } from "@/util/file";

function ChatUserBanner({
  onlineUsers,
  recipient,
  hasStartedTyping,
}: {
  onlineUsers: {};
  recipient: TUser | undefined;
  hasStartedTyping: {
    recipient: boolean;
  };
}) {
  const { type, base64 } = recipient!.profilePicture;
  const profileUrl = createUrl(base64, type);
  return (
    <div className=" w-full h-fit  p-2 sticky top-0 bg-white">
      <div className="flex  gap-2">
        <div className="relative ">
          <Image
            src={profileUrl ?? "https://imgur.com/0omjre2.png"}
            alt="prof"
            width={50}
            height={50}
            className="rounded-sm min-w-[50px] aspect-square max-w-[50px] object-cover"
          ></Image>
          {onlineUsers && (recipient?._id as string) in onlineUsers && (
            <OnlineIndicator />
          )}
        </div>
        <span className="w-fit">
          {recipient?.firstName} {recipient?.lastName} <br />
          <span className="text-sm opacity-45">
            {hasStartedTyping.recipient ? (
              <>
                <PulseLoader color="black" size={5} speedMultiplier={0.7} />{" "}
                typing
              </>
            ) : (
              "Last seen recently"
            )}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ChatUserBanner;
