"use client";

import { Input } from "@/components/ui/input";
import {
  closeChatArea,
  closeChatSideBar,
  openChatArea,
  openChatSideBar,
} from "@/lib/redux/slices/chat/chatSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
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

function ChatSideBar() {
  const sideBar = useSelector((state: RootState) => state.ChatSideBar);

  const dispatch = useDispatch<AppDispatch>();
  const [people, setPeople] = useState();
  let query: string = "";

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    query = e.currentTarget?.value;
    dispatch(chatSideBarSearch({ query }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  function handleContactSelect() {
    const innerWidth = window.innerWidth;

    // This is for mobile devices
    if (innerWidth <= 950) {
      dispatch(closeChatSideBar());
    }

    dispatch(openChatArea());

    // TODO : fetch data for the selected contact & display in chat area
  }

  return (
    <div
      className={cn(
        `h-full  bg-white p-2`,
        sideBar.enabled ? `${sideBar.enabledStyle}` : `${sideBar.disabledStyle}`
      )}
    >
      <section className="flex items-center gap-2">
        <Command>
          <CommandInput
            placeholder="Type a command or search..."
            onChangeCapture={(e) => handleSearch(e)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {people &&
              (people as []).map((people: any, key: any) => (
                <>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                  </CommandGroup>
                  {/* <SelectContact
                    key={key}
                    name="Dagmawi Wegayehu"
                    lastMessage="Hey bro how are you doing"
                    onClick={handleContactSelect}
                  /> */}
                </>
              ))}
          </CommandList>
        </Command>

        {/* <Input
          placeholder="Search people, groups or channels"
          onChangeCapture={(e) => handleSearch(e)}
        ></Input> */}
      </section>
      {/* <div className="h-full flex items-center ">
        <Badge variant={"outline"}></Badge>
      </div> */}
      {/* <section className="mt-2 flex flex-col gap-2">
        {people &&
          (people as []).map((people: any, key: any) => (
            <SelectContact
              key={key}
              name="Dagmawi Wegayehu"
              lastMessage="Hey bro how are you doing"
              onClick={handleContactSelect}
            />
          ))}
      </section> */}
    </div>
  );
}

export default ChatSideBar;
