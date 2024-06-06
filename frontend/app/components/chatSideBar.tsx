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
import {
  chatSideBarFetchAll,
  setCurrentChat,
} from "@/lib/redux/slices/chat/chatThunks";
import { TChatSideBarPerson } from "../types";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ChatCard from "./chatCard";

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

  function handleChatCardClick(id: string) {
    dispatch(setCurrentChat({ id }));
  }

  const { people } = sideBar.chat;

  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <SearchSideBar />
      <div className="flex flex-col gap-[-1]">
        {people &&
          people.map((person: TChatSideBarPerson, index: number) => {
            return (
              <ChatCard
                name={person.firstName + " " + person.lastName}
                recentMessage={person.recentMessage.content}
                profileUrl={person.profileUrl}
                onClick={() => handleChatCardClick(person._id)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ChatSideBar;
