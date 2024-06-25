import { useDispatch, useSelector } from "react-redux";
import useSocket from "./useSocket";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { setCurrentChat } from "@/lib/redux/slices/chat/chatThunks";
import { useRef, useState } from "react";

export function useChatSocket() {
  const chatArea = useSelector((state: RootState) => state.ChatArea);
  const dispatch = useDispatch<AppDispatch>();

  const typingTimeout = useRef(setTimeout(() => {}));

  const [hasStartedTyping, setHasStartedTyping] = useState({
    you: false,
    recipient: false,
  });

  function refreshChat() {
    if (chatArea.currentChat)
      dispatch(
        setCurrentChat({
          id: chatArea.currentChat.recipientId,
        })
      );
  }

  useSocket("chat:receiveMessage", ({ from, message }) => {
    console.log("You have recieved message: ", message, " from ", from);
    refreshChat();
  });

  useSocket("chat:type", (from) => {
    console.log("tyPING", from);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    setHasStartedTyping((prev) => ({ ...prev, recipient: true }));

    typingTimeout.current = setTimeout(() => {
      setHasStartedTyping((prev) => ({ ...prev, recipient: false }));
    }, 1000);
  });

  return { hasStartedTyping, setHasStartedTyping, refreshChat };
}
