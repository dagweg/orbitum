import { useEffect } from "react";
import io from "socket.io-client";
import { API_ORIGIN } from "../config/apiConfig";

const socket = io(API_ORIGIN);

export default function useSocket(
  eventName: string,
  callback: (data: any) => void
) {
  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to the server");
    };

    const handleConnectError = (error: Error) => {
      console.error("Connection error:", error);
    };

    const handleEvent = (data: any) => {
      console.log(`Received data for event ${eventName}:`, data);
      callback(data);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);
    socket.on(eventName, handleEvent);

    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off(eventName, handleEvent);
    };
  }, [eventName, callback]);

  return socket;
}
