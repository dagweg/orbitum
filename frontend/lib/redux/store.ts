import { configureStore } from "@reduxjs/toolkit";
import { chatAreaReducer, chatSideBarReducer } from "./slices/chatSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    chatSideBarReducer,
    chatAreaReducer,
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
