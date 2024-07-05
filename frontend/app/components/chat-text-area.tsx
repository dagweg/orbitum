import { Button } from "@/components/ui/button";
import {
  Circle,
  Dot,
  Mic,
  Paperclip,
  SendHorizontal,
  Smile,
} from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
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
import { MicHandlerReturn, TAudio } from "../hooks/useAudio";
import { BsRecordCircleFill } from "react-icons/bs";

function ChatTextArea({
  audio,
  message,
  setMessage,
  isRecording,
  setIsRecording,
  chatTextAreaRef,
  handleTextAreaChange,
  handleTextAreaKeyDown,
  handleTextAreaKeyUp,
  hasStartedTyping,
  handleMessageSend,
  handleMicRecord,
}: {
  audio: TAudio | undefined;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isRecording: boolean;
  setIsRecording: Dispatch<SetStateAction<boolean>>;
  chatTextAreaRef: RefObject<HTMLTextAreaElement>;
  handleTextAreaChange: (e: any) => void;
  handleTextAreaKeyDown: (e: any) => void;
  handleTextAreaKeyUp: (e: any) => void;
  hasStartedTyping: {
    you: boolean;
  };
  handleMessageSend: () => void;
  handleMicRecord: () => MicHandlerReturn;
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

  console.log(audio);

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

        <section className="relative pb-2  w-full  mx-auto flex flex-col-reverse items-end gap-3 bg-neutral-200 pt-4 h-fit px-10">
          <div className=" relative h-fit flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto ring-1 max-w-[700px]  focus-within:ring-2 ring-neutral-400 duration-200 ease-in  rounded-lg">
            <span
              className={cn(
                "absolute right-0 top-[-25px] flex font-semibold items-center gap-1 scale-0 duration-100 ease-in origin-bottom",
                isRecording && "scale-100 w-auto"
              )}
            >
              <BsRecordCircleFill
                color="red"
                className="animate-pulse duration-1000"
              />
              <span>Rec</span>
            </span>
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
                  onClick={hasStartedTyping.you ? handleMessageSend : undefined}
                  variant={"circleGhost"}
                  onMouseDown={
                    !hasStartedTyping.you ? handleMicRecord().start : undefined
                  }
                  onMouseUp={
                    !hasStartedTyping.you ? handleMicRecord().stop : undefined
                  }
                  className={cn(
                    "relative",
                    isRecording &&
                      "text-red-500 hover:text-red-500 bg-pink-100 hover:bg-pink-100 "
                  )}
                >
                  <div className="relative z-[100]">
                    <SendHorizontal
                      className={cn(
                        "scale-0 w-0 duration-200 ease-in",
                        (hasStartedTyping.you || message.length > 0) &&
                          "scale-100 w-auto"
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "relative flex flex-col  justify-center",
                      hasStartedTyping.you && "scale-0 w-0"
                    )}
                  >
                    <Mic
                      className={cn(
                        "scale-100 w-auto duration-200 ease-in z-10"
                      )}
                    />
                    {/* <span className="font-xs ">Rec</span> */}
                  </div>
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
