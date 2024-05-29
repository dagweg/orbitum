"use client";

import {
  closeChatSideBar,
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
    window.addEventListener("resize", handleResize);

    function handleResize(e: Event) {
      // @ts-ignore
      const innerWidth = e.currentTarget.innerWidth;

      if (innerWidth <= 950) {
        dispatch(closeChatSideBar());
      } else {
        dispatch(openChatSideBar());
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // function handleContactSelect() {
  //   const innerWidth = window.innerWidth;

  //   // This is for mobile devices
  //   if (innerWidth <= 950) {
  //     dispatch(closeChatSideBar());
  //   }

  //   dispatch(openChatArea());
  // }

  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <SearchSideBar />
    </div>
  );
}

export default ChatSideBar;
