import { configureStore } from "@reduxjs/toolkit";
import { chatAreaReducer, chatSideBarReducer } from "./slices/chatSlice";
import { userReducer, userSessionReducer } from "./slices/userSlice";
import { SESSION_TOKEN } from "@/app/config/constants";
import { string } from "zod";

const persistedState =
  typeof window !== "undefined"
    ? localStorage.getItem("reduxState")
      ? JSON.parse(localStorage.getItem("reduxState") as string)
      : {}
    : {};

export const store = configureStore({
  reducer: {
    userReducer,
    userSessionReducer,
    chatSideBarReducer,
    chatAreaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
