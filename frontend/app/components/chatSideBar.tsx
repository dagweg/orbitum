"use client";

import {
  closeChatSideBar,
  openChatSideBar,
  setOnlineUsers,
} from "@/lib/redux/slices/chat/chatSideBarSlice";
import {
  closeChatArea,
  openChatArea,
} from "@/lib/redux/slices/chat/chatAreaSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
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
import useSocket from "../hooks/useSocket";
import socket from "@/lib/socket";
import { createUrl } from "@/util/file";

function ChatSideBar() {
  const dispatch = useDispatch<AppDispatch>();

  const sideBar = useSelector((state: RootState) => state.ChatSideBar);
  const { onlineUsers } = sideBar.chat;

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
    if (window.innerWidth <= 950) {
      dispatch(closeChatSideBar());
      dispatch(openChatArea());
    }
  }

  const { people } = sideBar.chat;
  console.log(people);
  useSocket("users:connected", (data) => {
    dispatch(setOnlineUsers(data));
  });

  // console.log(people);
  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <SearchSideBar />
      <div className="flex flex-col ">
        {people &&
          people.map((person: TChatSideBarPerson, index: number) => {
            return (
              <ChatCard
                key={index}
                name={person.firstName + " " + person.lastName}
                recentMessage={person.recentMessage.content}
                date={person.recentMessage.date}
                profilePicture={
                  person.profilePicture
                    ? createUrl(
                        person.profilePicture.base64,
                        person.profilePicture.type
                      )
                    : undefined
                }
                isOnline={person._id in (onlineUsers ?? {})}
                onClick={() => handleChatCardClick(person._id)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ChatSideBar;
