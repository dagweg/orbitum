import React from "react";

type Props = {
  className?: string;
};
function OnlineIndicator({ className }: Props) {
  return (
    <div
      className={`w-[15px] rounded-full aspect-square bg-green-500 border-[3px] border-white absolute right-[-5px] top-[-5px] ${className}`}
    ></div>
  );
}

export default OnlineIndicator;
