"use client";

import { Input } from "@/components/ui/input";
import {
  closeChatArea,
  closeChatSideBar,
  openChatArea,
  openChatSideBar,
  setChatSideBar,
} from "@/lib/redux/slices/chat/chatSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { CalendarIcon, Search, User2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectContact from "./select-contact";
import { Badge } from "@/components/ui/badge";
import { API_ORIGIN } from "../config/apiConfig";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { chatSideBarSearch } from "@/lib/redux/slices/chat/chatThunks";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";

function ChatSideBar() {
  const sideBar = useSelector((state: RootState) => state.ChatSideBar);

  const dispatch = useDispatch<AppDispatch>();

  const { searchResult, searchPanel } = useSelector(
    (state: RootState) => state.ChatSideBar
  );

  const chatSideBar = useSelector((state: RootState) => state.ChatSideBar);

  const sideBarSearchRef = useRef<HTMLDivElement>(null);

  let query: string = "";

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    query = e.currentTarget?.value;
    dispatch(chatSideBarSearch({ query }));
    dispatch(
      setChatSideBar({ ...chatSideBar, searchPanel: { enabled: true } })
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClick);

    function handleResize(e: Event) {
      // @ts-ignore
      const innerHeight = e.currentTarget.innerHeight;
      // @ts-ignore
      const innerWidth = e.currentTarget.innerWidth;

      if (innerWidth <= 950) {
        dispatch(closeChatSideBar());
      } else {
        dispatch(openChatSideBar());
      }
    }

    function handleClick(e: Event) {
      // @ts-ignore
      const target = e.target;
      // @ts-ignore
      if (!sideBarSearchRef.current?.contains(target)) {
        dispatch(
          setChatSideBar({
            ...chatSideBar,
            searchPanel: { enabled: false },
          })
        );
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
    };
  }, [dispatch, chatSideBar]);

  function handleContactSelect() {
    const innerWidth = window.innerWidth;

    // This is for mobile devices
    if (innerWidth <= 950) {
      dispatch(closeChatSideBar());
    }

    dispatch(openChatArea());
  }

  return (
    <div
      className={cn(
        `h-full  bg-white p-2 shadow-lg`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
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
                      src="https://imgur.com/TUTGvNF.png"
                      alt="@username"
                      className="bg-center self-center "
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1">
                    <span>{result.userName}</span>
                    <span className="text-sm text-neutral-500">
                      {result.bio ?? "This is a test Bio"}
                    </span>
                  </div>
                  <Button variant={"ghost"}>Chat</Button>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;
