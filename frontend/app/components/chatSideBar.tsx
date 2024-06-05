"use client";

import {
  closeChatArea,
  closeChatSideBar,
  openChatArea,
  openChatSideBar,
} from "@/lib/redux/slices/chat/chatSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchSideBar from "./search-side-bar";

function ChatSideBar() {
  const dispatch = useDispatch<AppDispatch>();

  const sideBar = useSelector((state: RootState) => state.ChatSideBar);

  useEffect(() => {
    function handleResize() {
      const innerWidth = window.innerWidth;

      if (innerWidth <= 950) {
        dispatch(closeChatSideBar());
      } else {
        dispatch(openChatSideBar());
      }
    }

    function handleResizeInitial() {
      const innerWidth = window.innerWidth;

      if (innerWidth <= 950) {
        dispatch(closeChatArea());
      } else {
        dispatch(openChatArea());
      }
    }

    // Call handleResize once to handle initial load
    handleResizeInitial();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <SearchSideBar />
      <div></div>
    </div>
  );
}

export default ChatSideBar;
