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
    <section className="h-fit sticky bottom-0 w-[95%] md:w-[80%] mx-auto max-w-[700px] flex flex-col-reverse">
      <div className="flex items-center justify-around gap-4 bg-white w-full p-2 mx-auto mb-5 ring-1 shadow-2xl ring-neutral-400 rounded-lg">
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
