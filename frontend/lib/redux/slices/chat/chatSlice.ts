import { TChatArea, TChatSideBar } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import { chatSideBarSearch, setCurrentChat } from "./chatThunks";

const chatSideBarInitialState: TChatSideBar & {
  searchResult: [];
  people: [];
  groups: [];
  channels: [];
  searchPanel: {
    enabled: boolean;
  };
} = {
  enabled: true,
  enabledStyle: "w-full md:w-[400px]",
  disabledStyle: "w-0 hidden",
  searchPanel: {
    enabled: false,
  },
  searchResult: [],
  people: [],
  groups: [],
  channels: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(chatSideBarSearch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.searchResult = action.payload;
    });
  },
});

const chatAreaInitialState: TChatArea = {
  enabled: true,
  enabledStyle: "w-full",
  disabledStyle: "w-0 hidden",
  currentChat: {
    messages: [],
  },
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
      state.currentChat.messages = action.payload.reduce(
        (acc: any, curr: any) => {
          return acc.concat(curr.messages);
        },
        []
      );
    });
  },
});

export const { closeChatSideBar, openChatSideBar, setChatSideBar } =
  chatSideBarSlice.actions;
export const ChatSideBar = chatSideBarSlice.reducer;

export const { closeChatArea, openChatArea } = chatAreaSlice.actions;
export const ChatArea = chatAreaSlice.reducer;
