import Image from "next/image";
import React from "react";

function ChatWallpaper({ wallpaper }: { wallpaper: any }) {
  return (
    <Image
      src={wallpaper}
      alt="wallpaper"
      className="absolute w-full h-full object-fit z-[-1]   bg-current"
      width={2000}
      height={2000}
      unoptimized
    />
  );
}

export default ChatWallpaper;
