"use client";

import ChatArea from "@/app/components/chatArea";
import ChatSideBar from "@/app/components/chatSideBar";
function Chat() {
  return (
    <div className="fixed inset-0 mt-[65px] flex">
      <ChatSideBar />
      <ChatArea />
    </div>
  );
}

export default Chat;
