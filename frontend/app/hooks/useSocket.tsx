import { useEffect } from "react";
import socket from "@/lib/socket";
import getSocket from "@/lib/socket";

export default function useSocket(
  eventName: string = "connect",
  callback: (data: any) => void = () => {}
) {
  useEffect(() => {
    const socket = getSocket();

    const handleConnect = () => {
      console.log("Connected to the server");
    };

    const handleConnectError = (error: Error) => {
      console.error("Connection error:", error);
    };

    const handleEvent = (data: any) => {
      callback(data);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleConnectError);

    if (eventName !== "connect") socket.on(eventName, handleEvent);

    // Cleanup function
    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      if (eventName !== "connect") socket.off(eventName, handleEvent);
    };
  }, [eventName, callback]);

  return socket;
}
