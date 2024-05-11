"use client";

import { AppDispatch, RootState } from "@/lib/redux/store";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { API_HOST } from "../config/apiConfig";
import { SESSION_ID } from "../config/constants";
import { setUser, setUserSessionId } from "@/lib/redux/slices/userSlice";
import { useState } from "react";

function useSession() {
  const { email, sessionId } = useSelector(
    (state: RootState) => state.userSessionReducer
  );
  const user = useSelector((state: RootState) => state.userReducer);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const _sessionId = localStorage.getItem(SESSION_ID);
  dispatch(setUserSessionId(_sessionId ?? undefined));

  if (sessionId?.trim() === "") {
    return;
  }

  (async () => {
    // Validate the sessionId
    const response = await fetch(`${API_HOST}/api/v1/session/validate`, {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
    const data = await response.json();
    if (response.ok) {
      // Means the token is valid
      setIsTokenValid(true);
      dispatch(setUser(data.user));
    }
  })();

  return {};
}

export default useSession;
