import { Dispatch, SetStateAction, useRef } from "react";
import ChatTextArea from "./chat-text-area";
import { useChatInput } from "../hooks/useChatInput";

export function ChatInput({
  message,
  setMessage,
}: {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}) {
  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const visualizerRef = useRef();
  const {
    audio,
    isRecording,
    setIsRecording,
    hasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,
    handleMicRecord,
    handleMessageSend,
  } = useChatInput(message, setMessage, chatTextAreaRef);

  return (
    <>
      <ChatTextArea
        audio={audio}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        handleMicRecord={handleMicRecord}
        message={message}
        setMessage={setMessage}
        chatTextAreaRef={chatTextAreaRef}
        handleMessageSend={handleMessageSend}
        handleTextAreaChange={handleTextAreaChange}
        handleTextAreaKeyDown={handleTextAreaKeyDown}
        handleTextAreaKeyUp={handleTextAreaKeyUp}
        hasStartedTyping={hasStartedTyping}
      />
    </>
  );
}
