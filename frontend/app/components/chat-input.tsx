import { Dispatch, SetStateAction, useRef } from "react";
import ChatTextArea from "./chat-text-area";
import { useChatInput } from "../hooks/useChatInput";
import { useAudio } from "../hooks/useAudio";

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
    isRecording,
    setIsRecording,
    hasStartedTyping,
    setHasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,
    handleMessageSend,
  } = useChatInput(message, setMessage, chatTextAreaRef);

  const { audio, handleMicRecord } = useAudio(isRecording, setIsRecording);

  return (
    <>
      {audio && audio.url && (
        <audio controls>
          <source src={audio?.url} type="audio/wav"></source>
          Your browser doesn&apos;t support the audio element.
        </audio>
      )}
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
        setHasStartedTyping={setHasStartedTyping}
      />
    </>
  );
}
