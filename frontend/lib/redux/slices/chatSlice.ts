import { TChatArea, TChatSideBar } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

const chatSideBarInitialState: TChatSideBar = {
  enabled: true,
  enabledStyle: "w-full md:w-[400px]",
  disabledStyle: "w-0 hidden",
};

const chatSideBarSlice = createSlice({
  name: "chatSideBar",
  initialState: chatSideBarInitialState,
  reducers: {
    closeChatSideBar(state) {
      state.enabled = false;
    },
    openChatSideBar(state) {
      state.enabled = true;
    },
  },
});

const chatAreaInitialState: TChatArea = {
  enabled: true,
  enabledStyle: "w-full",
  disabledStyle: "w-0 hidden",
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
});

export const { closeChatSideBar, openChatSideBar } = chatSideBarSlice.actions;
export const chatSideBarReducer = chatSideBarSlice.reducer;

export const { closeChatArea, openChatArea } = chatAreaSlice.actions;
export const chatAreaReducer = chatAreaSlice.reducer;
