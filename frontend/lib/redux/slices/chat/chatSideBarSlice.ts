import { TChatArea, TChatSideBar } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  chatSideBarFetchAll,
  chatSideBarSearch,
  setCurrentChat,
} from "./chatThunks";

type TChatSideBarExtended = TChatSideBar & {
  searchResult: [];
  chat: {
    onlineUsers: {};
    people: [];
    groups: [];
    channels: [];
  };
  searchPanel: {
    enabled: boolean;
  };
};

const chatSideBarInitialState: TChatSideBarExtended = {
  enabled: true,
  enabledStyle: "w-full md:w-[400px]",
  disabledStyle: "w-0 hidden",
  searchPanel: {
    enabled: false,
  },
  searchResult: [],
  chat: {
    onlineUsers: {},
    people: [],
    groups: [],
    channels: [],
  },
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
    setChatSideBar(state, action) {
      return action.payload;
    },
    setOnlineUsers(state, action) {
      state.chat.onlineUsers = action.payload;
    },
    setSearchPanel(state, action) {
      state.searchPanel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatSideBarSearch.fulfilled, (state, action) => {
      state.searchResult = action.payload;
    });
    builder.addCase(chatSideBarFetchAll.fulfilled, (state, action) => {
      state.chat = action.payload;
    });
  },
});

export const {
  closeChatSideBar,
  openChatSideBar,
  setChatSideBar,
  setOnlineUsers,
  setSearchPanel,
} = chatSideBarSlice.actions;
export const ChatSideBar = chatSideBarSlice.reducer;
