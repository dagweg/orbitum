import { useSelector } from "react-redux";
import { useChatSocket } from "./useChatSocket";
import { RootState } from "@/lib/redux/store";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import socket from "@/lib/socket";
import { arrayBuffertoBase64, base64ToBlob } from "@/util/file";

export type MicHandlerReturn = {
  mouseDown: () => void;
  mouseUp: () => void;
};

export type TAudio = {
  url: string | undefined;
  base64: string | undefined;
  type: string | undefined;
  name?: string | undefined;
  size?: number;
};

export function useChatInput(
  message: string,
  setMessage: Dispatch<SetStateAction<string>>,
  chatTextAreaRef: RefObject<HTMLTextAreaElement>
) {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const [isRecording, setIsRecording] = useState(false);

  // For Audio recording
  const [audio, setAudio] = useState<TAudio>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const audioChunksRef = useRef<Blob[]>([]);

  const { refreshChat, setHasStartedTyping, hasStartedTyping } =
    useChatSocket();

  let keys = {
    enter: false,
    leftShift: false,
  };

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setHasStartedTyping({ ...hasStartedTyping, you: true });
    } else {
      setHasStartedTyping({ ...hasStartedTyping, you: false });
    }
    socket.emit("chat:type", {
      to: chatArea.currentChat?.recipientId,
    });
  }

  function handleTextAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      keys.enter = true;
    }

    if (e.code === "ShiftLeft") {
      keys.leftShift = true;
    }

    if (keys.enter && keys.leftShift) {
      // Send Message Here
      handleMessageSend();
      if (chatTextAreaRef && chatTextAreaRef.current)
        chatTextAreaRef.current.value = "";
    }
  }

  function handleTextAreaKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      keys.enter = false;
    }

    if (e.code === "ShiftLeft") {
      keys.leftShift = false;
    }
  }

  function handleMessageSend() {
    console.log(message);
    setMessage("");
    if (chatArea.currentChat) {
      socket.emit("chat:sendMessage", {
        to: chatArea.currentChat.recipientId,
        message,
      });

      setTimeout(() => refreshChat(), 50);
    }
  }

  function handleMicRecord(): MicHandlerReturn {
    function mouseDown() {
      // Start Recording
      if (!isRecording) {
        setIsRecording(true);
      }

      (async function record() {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          const arrayBuffer = await audioBlob.arrayBuffer();

          setAudio({
            url: audioUrl,
            base64: arrayBuffertoBase64(arrayBuffer),
            type: audioBlob.type,
            size: audioBlob.size,
          } as TAudio);

          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
      })();
    }

    function mouseUp() {
      // Stop recording
      setIsRecording(false);
      mediaRecorderRef?.current?.stop();

      // Add the audio to database
    }

    return { mouseDown, mouseUp };
  }

  return {
    audio,
    isRecording,
    setIsRecording,
    hasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,
    handleMicRecord,
    handleMessageSend,
  };
}
