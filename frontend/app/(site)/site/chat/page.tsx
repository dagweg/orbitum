"use client";

import ChatArea from "@/app/components/chatArea";
import ChatSideBar from "@/app/components/chatSideBar";
function Chat() {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex">
        <p className="sr-only">The blow is chat side bar</p>
        <ChatSideBar />

        <p className="sr-only">The blow is chat area</p>
        <ChatArea />
      </div>
    </div>
  );
}

export default Chat;
