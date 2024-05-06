"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { TAvatarWrapper, TBackground, TLineClamp, TSize } from "../types";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { send } from "process";

function AvatarWrapper({
  src = "",
  alt = "",
  fallback = <User />,
  name = "",
  date = undefined,
  lineClamp = "line-clamp-1",
  background = "bg-transparent",
  className = "",
  summary = "",
  noavatar = false,
  sender = "default",
  chatType = "default",
  size = "small",
}: TAvatarWrapper) {
  return (
    <div
      className={cn(
        `flex items-start justify-start gap-2 ${background}  rounded-lg ${className}`,
        sender === "you" && "border-r-2 border-blue-200 rounded-r-none",
        sender === "default" && "border-l-2 border-orange-200 rounded-l-none"
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
            "text-sm font-light",
            (date === undefined || summary.length > 0) && "hidden"
          )}
        >
          {date
            ? date.toDateString()
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
