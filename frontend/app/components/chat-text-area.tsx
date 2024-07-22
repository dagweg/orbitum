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
import { BsRecordCircleFill } from "react-icons/bs";
import { MicHandlerReturn, TAudio } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setChatMessage } from "@/lib/redux/slices/message/chatMessageSlice";
import { AttachmentButton } from "./attachment-button";

type Props = {
  chatTextAreaRef: RefObject<HTMLTextAreaElement>;
  handleTextAreaChange: (e: any) => void;
  handleTextAreaKeyDown: (e: any) => void;
  handleTextAreaKeyUp: (e: any) => void;
  hasStartedTyping: {
    you: boolean;
    recipient: boolean;
  };
  handleMessageSend: () => void;
  handleMicRecord: () => MicHandlerReturn;
  setHasStartedTyping: Dispatch<
    SetStateAction<{ you: boolean; recipient: boolean }>
  >;
};

function ChatTextArea({
  chatTextAreaRef,
  handleTextAreaChange,
  handleTextAreaKeyDown,
  handleTextAreaKeyUp,
  hasStartedTyping,
  handleMessageSend,
  handleMicRecord,
  setHasStartedTyping,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const chatAudio = useSelector((state: RootState) => state.ChatAudio);
  const chatVideo = useSelector((state: RootState) => state.ChatVideo);
  const message = useSelector((state: RootState) => state.ChatMessage);
  const { attachments } = useSelector(
    (state: RootState) => state.ChatAttachment
  );

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
    dispatch(setChatMessage(message?.value + e.emoji));
    setHasStartedTyping({ ...hasStartedTyping, you: true });
  };

  console.log(chatAudio.audio);

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
          <div
            className={cn(
              " relative h-fit flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto  max-w-[700px]   duration-200 ease-in    rounded-lg",
              attachments.length > 0 && "!rounded-t-none"
            )}
          >
            <span
              className={cn(
                "text-xs absolute right-[10px] top-[-20px] flex font-semibold items-center gap-1 scale-0 duration-100 ease-in origin-bottom",
                chatAudio.isRecording && "scale-100 w-auto"
              )}
            >
              <BsRecordCircleFill
                color="red"
                className="animate-pulse duration-1000"
              />
              <span>REC</span>
            </span>

            <div className="h-full flex flex-col-reverse items-end">
              <AttachmentButton />
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

                {hasStartedTyping.you ||
                message.length > 0 ||
                attachments.length > 0 ? (
                  <Button variant={"circleGhost"} onClick={handleMessageSend}>
                    <div className="relative z-[100]">
                      <SendHorizontal
                        className={cn("duration-200 ease-in w-auto")}
                      />
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant={"circleGhost"}
                    onMouseUp={handleMicRecord().stop}
                    onMouseDown={handleMicRecord().start}
                    className={cn(
                      "relative",
                      chatAudio.isRecording &&
                        "text-red-500 hover:text-red-500 bg-pink-100 hover:bg-pink-100 "
                    )}
                  >
                    <div
                      className={cn("relative flex flex-col  justify-center")}
                    >
                      <Mic
                        className={cn(
                          "scale-100 w-auto duration-200 ease-in z-10"
                        )}
                      />
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChatTextArea;
