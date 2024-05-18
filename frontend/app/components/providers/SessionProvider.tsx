"use client";

import { API_HOST } from "@/app/config/apiConfig";
import { isUserLoggedIn } from "@/lib/user";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const SessionContext = createContext({
  isLoggedIn: false,
});

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useLayoutEffect(() => {
    (async () => {
      const loggedIn = await isUserLoggedIn();
      setIsLoggedIn(loggedIn);
    })();
  }, []);
  return (
    <SessionContext.Provider value={{ isLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}
