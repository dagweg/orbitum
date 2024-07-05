"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  closeChatSideBar,
  openChatArea,
  setChatSideBar,
  setSearchPanel,
} from "@/lib/redux/slices/chat/chatSideBarSlice";
import {
  chatSideBarSearch,
  setCurrentChat,
} from "@/lib/redux/slices/chat/chatThunks";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutsideObserver from "../hooks/useClickOutsideObserver";
import { Search } from "lucide-react";
import { TUserSchema } from "@/lib/types/schema";
import { createUrl } from "@/util/file";
import { initials } from "@/lib/utils";

function SearchSideBar() {
  const dispatch = useDispatch<AppDispatch>();

  const { searchResult, searchPanel } = useSelector(
    (state: RootState) => state.ChatSideBar
  );

  const chatSideBar = useSelector((state: RootState) => state.ChatSideBar);

  const sideBarSearchRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
    if (searchPanel.enabled) dispatch(setSearchPanel({ enabled: false }));
  };

  useClickOutsideObserver(sideBarSearchRef, handleOutsideClick);

  let query: string = "";

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    query = e.currentTarget?.value;
    dispatch(chatSideBarSearch({ query }));
    if (!searchPanel.enabled) dispatch(setSearchPanel({ enabled: true }));
  };

  const handleChatClick = (id: string) => {
    // Add the user to the chat
    dispatch(setCurrentChat({ id }));
    dispatch(openChatArea());

    const width = window.innerWidth;
    if (width <= 950) {
      dispatch(closeChatSideBar());
    }
    handleOutsideClick();
  };

  return (
    <div
      ref={sideBarSearchRef}
      className="flex flex-col items-center gap-2 z-10 py-2 sticky top-0 "
    >
      <div className="w-full relative flex items-center">
        <Input
          placeholder="Search people, groups or channels"
          onChangeCapture={(e) => handleSearch(e)}
          className=" !rounded-b-none focus:!ring-0  focus:border-2 focus:!border-neutral-300"
        />
        <Search className="absolute right-2 opacity-60 " size={20} />
      </div>
      {searchPanel.enabled && searchResult && (
        <div className="w-full bg-neutral-100 shadow-lg rounded-lg absolute top-[3rem] border-neutral-300 border-t-0 rounded-t-none border-2">
          {searchResult.map((result: TUserSchema, key: any) => {
            const profileUrl = createUrl(
              result.profilePicture.base64,
              result.profilePicture.type
            );
            return (
              <>
                <div className="hover:bg-neutral-50 p-2 rounded-md flex items-center gap-3 cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={profileUrl}
                      alt="@username"
                      className="bg-center self-center object-cover"
                    />
                    <AvatarFallback>
                      {initials(result.firstName, result.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <span>{result.firstName + " " + result.lastName}</span>
                    <span className="text-sm text-neutral-500">
                      {result.bio ?? "This is a test Bio"}
                    </span>
                  </div>
                  <Button
                    variant={"ghost"}
                    onClick={() => handleChatClick(result._id as string)}
                  >
                    Chat
                  </Button>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchSideBar;
