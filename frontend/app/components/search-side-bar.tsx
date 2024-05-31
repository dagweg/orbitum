"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setChatSideBar } from "@/lib/redux/slices/chat/chatSlice";
import {
  chatSideBarSearch,
  setCurrentChat,
} from "@/lib/redux/slices/chat/chatThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutsideObserver from "../hooks/clickOutsideObserver";

function SearchSideBar() {
  const dispatch = useDispatch<AppDispatch>();

  const { searchResult, searchPanel } = useSelector(
    (state: RootState) => state.ChatSideBar
  );

  const chatSideBar = useSelector((state: RootState) => state.ChatSideBar);

  const sideBarSearchRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
    dispatch(
      setChatSideBar({
        ...chatSideBar,
        searchPanel: { enabled: false },
      })
    );
  };

  useClickOutsideObserver(sideBarSearchRef, handleOutsideClick);

  let query: string = "";

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    query = e.currentTarget?.value;
    dispatch(chatSideBarSearch({ query }));
    dispatch(
      setChatSideBar({ ...chatSideBar, searchPanel: { enabled: true } })
    );
  };

  const handleChatClick = (id: string) => {
    // Add the user to the chat
    dispatch(setCurrentChat({ id }));
  };

  return (
    <div ref={sideBarSearchRef} className="flex flex-col items-center gap-2">
      <Input
        placeholder="Search people, groups or channels"
        onChangeCapture={(e) => handleSearch(e)}
      />
      <div className="w-full bg-neutral-50 shadow-lg rounded-lg">
        {searchPanel.enabled &&
          searchResult &&
          searchResult.map((result: any, key: any) => (
            <>
              <div className="hover:bg-neutral-50 p-2 rounded-md flex items-center gap-3 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src="https://imgur.com/HdZ9ZqY.png"
                    alt="@username"
                    className="bg-center self-center"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span>{result.firstName + " " + result.lastName}</span>
                  <span className="text-sm text-neutral-500">
                    {result.bio ?? "This is a test Bio"}
                  </span>
                </div>
                <Button
                  variant={"ghost"}
                  onClick={() => handleChatClick(result._id)}
                >
                  Chat
                </Button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default SearchSideBar;
