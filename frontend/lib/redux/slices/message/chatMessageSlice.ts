import { TMessageSchema } from "@/lib/types/schema";
import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

const chatMessageSlice = createSlice({
  name: "chatMessage",
  initialState,
  reducers: {
    setChatMessage(state, action) {
      return action.payload;
    },
  },
});

export const { setChatMessage } = chatMessageSlice.actions;
export const ChatMessage = chatMessageSlice.reducer;
