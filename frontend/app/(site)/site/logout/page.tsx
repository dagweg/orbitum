"use client";

import LoaderPage from "@/app/components/loader-page";
import { API_ORIGIN } from "@/app/config/apiConfig";
import { useEffect } from "react";

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
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen  justify-center items-center">
      <LoaderPage description="Logging you out..." />
    </div>
  );
}

export default Logout;
