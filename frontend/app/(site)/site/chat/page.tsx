"use client";

import ChatArea from "@/app/components/chatArea";
import ChatSideBar from "@/app/components/chatSideBar";
function Chat() {
  return (
    <div className="h-screen w-screen  flex">
      <ChatSideBar />
      <ChatArea />
    </div>
  );
}

export default Chat;
