"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { TSize } from "../types";
import { cn } from "@/lib/utils";

function AvatarWrapper({
  src = "",
  alt = "",
  fallback = "",
  size = "small",
}: {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: TSize;
}) {
  return (
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
  );
}

export default AvatarWrapper;
