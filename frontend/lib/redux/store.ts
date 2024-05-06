import { configureStore } from "@reduxjs/toolkit";
import chatSideBarReducer, { closeChatSideBar } from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    chatSideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
