"use client";

import useSocket from "@/app/hooks/useSocket";
import React, { createContext } from "react";

function SocketProvider({ children }: { children: React.ReactNode }) {
  // This is to initially connect the user to the socket server
  // (Which will be used to detect online status and more...)

  const handleConnect = () => {
    console.log("Handled Socket Initial Connection");
  };
  const socket = useSocket("connect", handleConnect);

  return <>{children}</>;
}

export default SocketProvider;
