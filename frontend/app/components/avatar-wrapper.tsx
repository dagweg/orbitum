"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { TAvatarWrapper, TBackground, TLineClamp, TSize } from "../types";
import { cn } from "@/lib/utils";
import { Dot, User } from "lucide-react";
import { send } from "process";
import { timeAgo as time_ago, timeAgo } from "@/util/time";

function AvatarWrapper({
  src = "",
  alt = "",
  fallback = <User />,
  name = "",
  date = undefined,
  dateType = "both",
  lineClamp = "line-clamp-1",
  background = "bg-transparent",
  className = "",
  summary = "",
  noavatar = false,
  sender = "default",
  chatType = "default",
  size = "small",
}: TAvatarWrapper) {
  let dateModif;
  if (date)
    switch (dateType) {
      case "timeAgo":
        dateModif = time_ago(date.toISOString());
        break;
      case "both":
        dateModif = (
          <div className="flex items-center">
            {date.toDateString()} <Dot opacity={0.2} />{" "}
            {time_ago(date.toISOString())}
          </div>
        );
        break;
      default:
        dateModif = date.toDateString();
        break;
    }

  return (
    <div
      className={cn(
        `flex items-start justify-start gap-2 ${background}  rounded-lg ${className}`
      )}
    >
      {!noavatar && (
        <Avatar
          className={cn(
            size == "small"
              ? "h-12 w-12"
              : size == "medium"
              ? "h-20 w-20"
              : size == "large"
              ? "h-32 w-32"
              : "h-12 w-12",
            "overflow-hidden rounded-full"
          )}
        >
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col",
          name.length > 0 || date !== undefined || summary.length > 0
            ? "visible"
            : "hidden"
        )}
      >
        <span
          className={cn(
            (name.length == 0 || chatType === "private") && "hidden"
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "text-[10pt] opacity-70 ",
            (date === undefined || summary.length > 0) && "hidden"
          )}
        >
          {date
            ? dateModif
            : new Date().toDateString().split(" ").slice(1, 4).join(" ")}
        </span>

        <span
          className={cn(
            `text-sm font-light ${lineClamp} max-w-prose`,
            summary.length <= 0 && "hidden"
          )}
        >
          {summary}
        </span>
      </div>
    </div>
  );
}

export default AvatarWrapper;
