"use client";

import LoaderPage from "@/app/components/loader-page";
import { API_ORIGIN } from "@/app/config/apiConfig";
import getSocket from "@/lib/socket";
import { useEffect } from "react";

const socket = getSocket();

function Logout() {
  useEffect(() => {
    (async () => {
      const response = await fetch(`${API_ORIGIN}/api/v1/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })();
  }, []);

  socket.emit("user:logout");

  return (
    <div className="flex flex-col h-screen  justify-center items-center">
      <LoaderPage description="Logging you out..." />
    </div>
  );
}

export default Logout;
