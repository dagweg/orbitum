import { createSlice } from "@reduxjs/toolkit";
import { TAudio, TImage, TVideo } from "@/app/types";

export type TChatAttachment = {
  audios: TAudio[];
  videos: TVideo[];
  photos: TImage[];
};

const initialState: TChatAttachment = {
  audios: [],
  videos: [],
  photos: [],
};

const chatAttachmentSlice = createSlice({
  name: "chatAttachment",
  initialState,
  reducers: {
    setAudios(state, action) {
      state.audios = action.payload;
    },
    setVideos(state, action) {
      state.videos = action.payload;
    },
    setPhotos(state, action) {
      state.photos = action.payload;
    },
  },
});

export const { setAudios, setVideos, setPhotos } = chatAttachmentSlice.actions;
export const ChatAttachment = chatAttachmentSlice.reducer;
