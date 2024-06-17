import { Button } from "@/components/ui/button";
import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react";
import React, { Ref } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { boolean } from "zod";

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
  return (
    <section className=" pb-2     bottom-0 sticky w-full  mx-auto flex flex-col-reverse bg-neutral-200 pt-4 h-fit px-10">
      <div className="flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto ring-1 max-w-[700px]  ring-neutral-400  rounded-lg">
        <div className="h-full flex flex-col-reverse items-end">
          <Button variant={"circleGhost"}>
            <Paperclip className="" />
          </Button>
        </div>
        <TextAreaAutoSize
          maxRows={10}
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
  );
}

export default ChatTextArea;
