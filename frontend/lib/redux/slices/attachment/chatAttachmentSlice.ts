import { createSlice } from "@reduxjs/toolkit";
import { TAudio, TImage, TVideo } from "@/app/types";

export type TChatAttachment = {
  audios?: TAudio[];
  videos?: TVideo[];
  photos?: TImage[];
};

let initialState: TChatAttachment | null = {};

const chatAttachmentSlice = createSlice({
  name: "chatAttachment",
  initialState,
  reducers: {
    setAudios(state, action) {
      if (!state) {
        state = {
          audios: [action.payload],
        };
      } else {
        state.audios = action.payload;
      }
    },
    setVideos(state, action) {
      if (!state) {
        state = {
          videos: [action.payload],
        };
      } else {
        state.videos = action.payload;
      }
    },
    setPhotos(state, action) {
      if (!state) {
        state = {
          photos: [action.payload],
        };
      } else {
        state.photos = action.payload;
      }
    },
  },
});

export const { setAudios, setVideos, setPhotos } = chatAttachmentSlice.actions;
export const ChatAttachment = chatAttachmentSlice.reducer;
