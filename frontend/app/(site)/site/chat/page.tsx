"use client";

import AvatarWrapper from "@/app/components/avatar-wrapper";
import ChatMessage from "@/app/components/chat-message";
import Heading from "@/app/components/heading";
import SelectContact from "@/app/components/select-contact";
import { Input } from "@/components/ui/input";
import chatSideBarReducer, {
  closeChatSideBar,
  openChatSideBar,
} from "@/lib/redux/slices/chatSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Chat() {
  // const [sideBar, setSideBar] = useState<TChatSideBar>({
  //   enabled: true,
  //   enabledStyle: "w-[400px]",
  //   disabledStyle: "w-0 hidden",
  // });

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
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex">
        <div
          className={cn(
            `h-full border-r-[1px] border-neutral-600 bg-white p-2`,
            sideBar.enabled
              ? `${sideBar.enabledStyle}`
              : `${sideBar.disabledStyle}`
          )}
        >
          <section className="flex items-center gap-2">
            <Search />
            <Input placeholder="Search people, groups or channels"></Input>
          </section>
          <section className="mt-2 flex flex-col gap-2">
            <SelectContact
              name="Dagmawi Wegayehu"
              lastMessage="Hey bro how are you doing"
            />
          </section>
        </div>

        <div className="flex-1 flex h-full bg-neutral-500">
          <section>
            <ChatMessage
              name="Dagmawi Tefera"
              message="Hey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing Hey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doingHey how are you doing"
            />
            <AvatarWrapper name="You" summary="I'm doing great... you?  " />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Chat;
