import { configureStore } from "@reduxjs/toolkit";
import { chatAreaReducer, chatSideBarReducer } from "./slices/chatSlice";
import { userReducer } from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    userReducer,
    chatSideBarReducer,
    chatAreaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
