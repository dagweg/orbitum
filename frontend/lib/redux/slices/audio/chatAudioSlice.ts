import { TAudio } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

export type TChatAudio = {
  isRecording: boolean;
  audio?: TAudio;
};

const initialState: TChatAudio = {
  isRecording: false,
  audio: undefined,
};

const chatAudioSlice = createSlice({
  name: "chatAudio",
  initialState,
  reducers: {
    setAudio(state, action) {
      state.audio = action.payload;
    },
    setIsRecording(state, action) {
      state.isRecording = action.payload;
    },
  },
});

export const { setAudio, setIsRecording } = chatAudioSlice.actions;
export const ChatAudio = chatAudioSlice.reducer;
