"use client";

import { Input } from "@/components/ui/input";
import {
  closeChatArea,
  closeChatSideBar,
  openChatArea,
  openChatSideBar,
} from "@/lib/redux/slices/chatSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectContact from "./select-contact";
import { Badge } from "@/components/ui/badge";

function ChatSideBar() {
  const sideBar = useSelector((state: RootState) => state.chatSideBarReducer);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Helo");
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
        <Search />
        <Input placeholder="Search people, groups or channels"></Input>
      </section>
      <div className="h-full flex items-center ">
        <Badge variant={"outline"}></Badge>
      </div>
      <section className="mt-2 flex flex-col gap-2">
        {/* <SelectContact
          name="Dagmawi Wegayehu"
          lastMessage="Hey bro how are you doing"
          onClick={handleContactSelect}
        /> */}
      </section>
    </div>
  );
}

export default ChatSideBar;
