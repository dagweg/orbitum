import { useEffect } from "react";

import io from "socket.io-client";
import { API_ORIGIN } from "../config/apiConfig";

const socket = io(API_ORIGIN);

export default function useSocket(
  eventName: string,
  callback: (data: any) => void
) {
  useEffect(() => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);

  return socket;
}
