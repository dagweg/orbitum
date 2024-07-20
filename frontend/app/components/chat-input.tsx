import { Dispatch, SetStateAction, useRef } from "react";
import ChatTextArea from "./chat-text-area";
import { useChatInput } from "../hooks/useChatInput";
import { useAudio } from "../hooks/useAudio";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export function ChatInput() {
  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const chatAudio = useSelector((state: RootState) => state.ChatAudio);

  const {
    hasStartedTyping,
    setHasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,
    handleMessageSend,
  } = useChatInput(chatTextAreaRef);

  const { handleMicRecord } = useAudio();

  return (
    <>
      <ChatTextArea
        handleMicRecord={handleMicRecord}
        chatTextAreaRef={chatTextAreaRef}
        handleMessageSend={handleMessageSend}
        handleTextAreaChange={handleTextAreaChange}
        handleTextAreaKeyDown={handleTextAreaKeyDown}
        handleTextAreaKeyUp={handleTextAreaKeyUp}
        hasStartedTyping={hasStartedTyping}
        setHasStartedTyping={setHasStartedTyping}
      />
    </>
  );
}
