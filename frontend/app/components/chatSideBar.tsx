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
import { chatSideBarFetchAll } from "@/lib/redux/slices/chat/chatThunks";
import { TChatSideBarPerson } from "../types";

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

    dispatch(chatSideBarFetchAll());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const { people } = sideBar.chat;

  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <SearchSideBar />
      <div>
        {people &&
          people.map((person: TChatSideBarPerson) => {
            return (
              <div
                key={person._id}
                className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg shadow-sm"
              >
                <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
                <div>
                  <div className="font-semibold">{person.firstName}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatSideBar;
