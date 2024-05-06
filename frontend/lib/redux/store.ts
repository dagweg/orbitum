import { configureStore } from "@reduxjs/toolkit";
import { chatAreaReducer, chatSideBarReducer } from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    chatSideBarReducer,
    chatAreaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
