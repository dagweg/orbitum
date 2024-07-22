import { cn, getTime2 } from "@/lib/utils";
import { TChatMessageProps, TFile } from "../types";
import AvatarWrapper from "./avatar-wrapper";
import { send } from "process";
import { Check, CheckCheck, Clock, File, Timer } from "lucide-react";
import React from "react";
import { createUrl, identifyMultimediaFileType } from "@/util/file";
import Image from "next/image";

function ChatMessage({
  name,
  message,
  sender = "default",
  audio,
  video,
  attachment,
  chatType = "private",
  date,
}: TChatMessageProps) {
  let dateModif = getTime2(new Date(date?.toString() as string));
  // console.log(audio);
  console.log(attachment);

  if ((!attachment || !attachment.length) && !message && !video && !audio)
    return;

  return (
    <div
      className={cn(
        "px-2  py-1 w-full flex flex-col",
        sender === "default" ? "items-start" : "items-end"
      )}
    >
      <div className="bg-neutral-100 p-2 w-fit  rounded-t-md rounded-b-lg">
        {audio ? (
          <audio controls>
            <source src={audio.url} type={audio.type}></source>
            Your browser doesn&apos;t support the audio element.
          </audio>
        ) : video ? (
          <video controls>
            <source src={video.url} type={video.type}></source>
            Your browser doesn&apos;t support the video element.
          </video>
        ) : attachment && attachment.length > 0 && message ? (
          <div>
            {attachment.map((file, index) => (
              <span key={index}>{file.name}</span>
            ))}
          </div>
        ) : message ? (
          <>{message}</>
        ) : (
          attachment && attachment.length > 0 && renderAttachment(attachment)
        )}
      </div>

      <span className="absolute bottom-[18px] px-2 flex flex-col items-center justify-center text-[8pt]  ">
        <CheckCheck className="seen" size={13} opacity={0.5} />
        {/* <Check className="sent" size={13} opacity={0.5} /> */}
        {/* <Clock className="pending" size={10} opacity={0.5} /> */}
      </span>
      <span
        className={cn(
          "font-light text-xs opacity-50 w-full px-1 ",
          sender === "you" ? "text-right" : "text-left"
        )}
      >
        {dateModif}
      </span>
    </div>
  );
}

export default ChatMessage;

function renderAttachment(attachment: TFile[]): React.ReactElement {
  return (
    <>
      {attachment.map((file: TFile, index) => {
        let toRender: React.ReactElement;

        const fileUrl = createUrl(file.base64, file.type);

        switch (identifyMultimediaFileType(file.type)) {
          case "Photo":
            toRender = fileUrl ? (
              <Image
                src={fileUrl}
                alt={file.name}
                width={400}
                height={400}
                className="max-w-[400px]  object-contain"
              />
            ) : (
              <>Tried to send Unsupported Image</>
            );
            break;
          case "Audio":
            toRender = (
              <audio controls>
                <source src={fileUrl} type={file.type}></source>
                Your browser doesn&apos;t support the audio element.
              </audio>
            );
            break;
          case "Video":
            toRender = (
              <video controls>
                <source src={fileUrl} type={file.type}></source>
                Your browser doesn&apos;t support the video element.
              </video>
            );
            break;
          default:
            toRender = (
              <div className="flex flex-col items-center">
                <File />
                <span>{file.name.slice(10)}</span>
              </div>
            );
        }
        return toRender;
      })}
    </>
  );
}
