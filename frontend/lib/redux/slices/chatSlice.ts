import { TChatSideBar } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TChatSideBar = {
  enabled: true,
  enabledStyle: "w-[400px]",
  disabledStyle: "w-0 hidden",
};

const chatSideBarSlice = createSlice({
  name: "chatSideBar",
  initialState,
  reducers: {
    closeChatSideBar(state) {
      state.enabled = false;
    },
    openChatSideBar(state) {
      state.enabled = true;
    },
  },
});

export const { closeChatSideBar, openChatSideBar } = chatSideBarSlice.actions;

const chatSideBarReducer = chatSideBarSlice.reducer;
export default chatSideBarReducer;
