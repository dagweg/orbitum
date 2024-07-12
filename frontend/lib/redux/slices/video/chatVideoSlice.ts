import { TVideo } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

export type TChatVideo = {
  isRecording: boolean;
  video?: TVideo;
};

const initialState: TChatVideo = {
  isRecording: false,
  video: undefined,
};

const chatVideoSlice = createSlice({
  name: "chatVideo",
  initialState,
  reducers: {
    setVideo(state, action) {
      state.video = action.payload;
    },
  },
});

export const { setVideo } = chatVideoSlice.actions;
export const ChatVideo = chatVideoSlice.reducer;
