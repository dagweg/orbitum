import { Button } from "@/components/ui/button";
import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { cn } from "@/lib/utils";
import useClickOutsideObserver from "../hooks/useClickOutsideObserver";

function ChatTextArea({
  message,
  setMessage,
  chatTextAreaRef,
  handleTextAreaChange,
  handleTextAreaKeyDown,
  handleTextAreaKeyUp,
  hasStartedTyping,
  handleMessageSend,
  handleMicRecord,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  chatTextAreaRef: RefObject<HTMLTextAreaElement>;
  handleTextAreaChange: (e: any) => void;
  handleTextAreaKeyDown: (e: any) => void;
  handleTextAreaKeyUp: (e: any) => void;
  hasStartedTyping: {
    you: boolean;
  };
  handleMessageSend: () => void;
  handleMicRecord: () => void;
}) {
  const [emojiPane, setEmojiPane] = useState({
    enabled: false,
  });

  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiRefHandleClickOutside = () => {
    setEmojiPane({
      ...emojiPane,
      enabled: false,
    });
  };
  useClickOutsideObserver(emojiRef, emojiRefHandleClickOutside);

  const handleEmojiClick = (e: EmojiClickData) => {
    const message = chatTextAreaRef.current;
    setMessage(message?.value + e.emoji);
  };

  return (
    <>
      <div className="flex flex-col w-full  sticky  bottom-0 ">
        <div
          ref={emojiRef}
          className={cn(
            "relative max-w-[700px] w-full mx-auto duration-100 ease-out",
            emojiPane.enabled ? "scale-y-1" : "scale-y-0"
          )}
        >
          <EmojiPicker
            className="!absolute bottom-0 right-0 z-[1000]"
            onEmojiClick={(e) => handleEmojiClick(e)}
          />
        </div>

        <section className=" pb-2  w-full  mx-auto flex flex-col-reverse items-end gap-3 bg-neutral-200 pt-4 h-fit px-10">
          <div className="h-fit flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto ring-1 max-w-[700px]  focus-within:ring-2 ring-neutral-400 duration-200 ease-in  rounded-lg">
            <div className="h-full flex flex-col-reverse items-end">
              <Button variant={"circleGhost"}>
                <Paperclip className="" />
              </Button>
            </div>

            <TextAreaAutoSize
              maxRows={5}
              ref={chatTextAreaRef}
              className=" outline-none rounded-lg no-scrollbar md:scrollbar resize-none"
              placeholder="Type a message"
              value={message}
              onChange={(e) => handleTextAreaChange(e)}
              onKeyDown={(e) => handleTextAreaKeyDown(e)}
              onKeyUp={(e) => handleTextAreaKeyUp(e)}
              style={{ width: "100%" }}
            />
            <div className="h-full flex flex-col-reverse items-end">
              <div className="flex items-end">
                <Button
                  variant={"circleGhost"}
                  onClick={() =>
                    setEmojiPane((prev) => ({ enabled: !prev.enabled }))
                  }
                >
                  <Smile />
                </Button>
                <Button
                  onClick={
                    hasStartedTyping.you ? handleMessageSend : handleMicRecord
                  }
                  variant={"circleGhost"}
                >
                  <SendHorizontal
                    className={cn(
                      "scale-0 w-0 duration-200 ease-in",
                      (hasStartedTyping.you || message.length > 0) &&
                        "scale-100 w-auto"
                    )}
                  />
                  <Mic
                    className={cn(
                      "scale-100 w-auto duration-200 ease-in",
                      hasStartedTyping.you && "scale-0 w-0"
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChatTextArea;
