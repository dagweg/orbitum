import { Button } from "@/components/ui/button";
import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";
import React, { Ref, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import EmojiPicker from "emoji-picker-react";

function ChatTextArea({
  chatTextAreaRef,
  handleTextAreaChange,
  handleTextAreaKeyDown,
  handleTextAreaKeyUp,
  hasStartedTyping,
  handleMessageSend,
}: {
  chatTextAreaRef: Ref<HTMLTextAreaElement>;
  handleTextAreaChange: (e: any) => void;
  handleTextAreaKeyDown: (e: any) => void;
  handleTextAreaKeyUp: (e: any) => void;
  hasStartedTyping: {
    you: boolean;
  };
  handleMessageSend: () => void;
}) {
  const [emojiPane, setEmojiPane] = useState({
    enabled: false,
  });

  return (
    <>
      <div className="flex flex-col w-full  sticky  bottom-0 ">
        {emojiPane.enabled && (
          <div className="relative max-w-[700px] w-full mx-auto">
            <EmojiPicker className="!absolute bottom-0 right-0 z-[1000]" />
          </div>
        )}
        <section className=" pb-2     w-full  mx-auto flex flex-col-reverse items-end gap-3 bg-neutral-200 pt-4 h-fit px-10">
          <div className="h-fit flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto ring-1 max-w-[700px]  ring-neutral-400  rounded-lg">
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
              onChange={(e) => handleTextAreaChange(e)}
              onKeyDown={(e) => handleTextAreaKeyDown(e)}
              onKeyUp={(e) => handleTextAreaKeyUp(e)}
              style={{ width: "100%" }}
            />
            <div className="h-full flex flex-col-reverse items-end">
              <div className="flex items-end">
                <Button variant={"circleGhost"}>
                  <Smile />
                </Button>
                <Button
                  onClick={hasStartedTyping.you ? handleMessageSend : () => {}}
                  variant={"circleGhost"}
                >
                  {hasStartedTyping.you ? <SendHorizontal /> : <Mic />}
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
