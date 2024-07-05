import { TChatArea } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import { setCurrentChat } from "./chatThunks";

const chatAreaInitialState: TChatArea = {
  enabled: true,
  enabledStyle: "w-full",
  disabledStyle: "w-0 hidden",
  currentChat: undefined,
};

const chatAreaSlice = createSlice({
  name: "chatArea",
  initialState: chatAreaInitialState,
  reducers: {
    closeChatArea(state) {
      state.enabled = false;
    },
    openChatArea(state) {
      state.enabled = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentChat.fulfilled, (state, action) => {
      state.currentChat = action.payload;
    });
  },
});

export const { closeChatArea, openChatArea } = chatAreaSlice.actions;
export const ChatArea = chatAreaSlice.reducer;
