import { useDispatch, useSelector } from "react-redux";
import { useChatSocket } from "./useChatSocket";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { arrayBuffertoBase64, base64ToBlob } from "@/util/file";
import { TAttachment, TAudio, TVideo } from "../types";
import { setChatMessage } from "@/lib/redux/slices/message/chatMessageSlice";
import { clearAttachments } from "@/lib/redux/slices/attachment/chatAttachmentSlice";
import getSocket from "@/lib/socket";

const socket = getSocket();

/**
 * Everything related to the chatinput is handled here inside useChatInput hook
 */
/**
 *
 * @param message
 * @param setMessage
 * @param chatTextAreaRef
 * @returns
 */
export function useChatInput(chatTextAreaRef: RefObject<HTMLTextAreaElement>) {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const [isRecording, setIsRecording] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const message = useSelector((state: RootState) => state.ChatMessage);
  const chatAudio = useSelector((state: RootState) => state.ChatAudio);
  const chatVideo = useSelector((state: RootState) => state.ChatVideo);
  const chatAttachment = useSelector(
    (state: RootState) => state.ChatAttachment
  );

  const { refreshChat, setHasStartedTyping, hasStartedTyping } =
    useChatSocket();

  let keys = {
    enter: false,
    leftShift: false,
  };

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setChatMessage(e.currentTarget.value));
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
      if (chatTextAreaRef && chatTextAreaRef.current) {
        chatTextAreaRef.current.value = "";
      }
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
    const data = {
      to: chatArea?.currentChat?.recipientId,
      content: message.length > 0 ? message : undefined,
      audio: chatAudio.audio,
      video: chatVideo.video,
      attachment: chatAttachment.attachments,
    };

    console.log("Sending data", data);

    socket.emit("chat:sendMessage", {
      to: chatArea?.currentChat?.recipientId,
      content: message.length > 0 ? message : undefined,
      audio: chatAudio.audio,
      video: chatVideo.video,
    });

    setTimeout(() => refreshChat(), 50);

    dispatch(setChatMessage(""));
    dispatch(clearAttachments());
  }

  return {
    setHasStartedTyping,
    hasStartedTyping,
    handleTextAreaChange,
    handleTextAreaKeyDown,
    handleTextAreaKeyUp,
    handleMessageSend,
  };
}
