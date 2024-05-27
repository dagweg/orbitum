import { configureStore } from "@reduxjs/toolkit";
import { ChatArea, ChatSideBar } from "./slices/chatSlice";
import { User } from "./slices/user/userSlice";
import { Posts } from "./slices/post/postSlice";

export const store = configureStore({
  reducer: {
    User,
    ChatSideBar,
    ChatArea,
    Posts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
