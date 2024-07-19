import { createSlice } from "@reduxjs/toolkit";
import { TAudio, TImage, TVideo } from "@/app/types";

export type TChatAttachment = {
  audios: TAudio[] | [];
  videos: TVideo[] | [];
  photos: TImage[] | [];
};

export type TChatAttachmentProps = {
  attachments: TChatAttachment;
  isUploadAttachmentOpen: boolean;
};

let initialState: TChatAttachmentProps = {
  attachments: {
    audios: [],
    videos: [],
    photos: [],
  },
  isUploadAttachmentOpen: false,
};

const chatAttachmentSlice = createSlice({
  name: "chatAttachment",
  initialState,
  reducers: {
    setAudios(state, action) {
      state.attachments.audios = action.payload;
    },
    setVideos(state, action) {
      state.attachments.videos = action.payload;
    },
    setPhotos(state, action) {
      state.attachments.photos = action.payload;
    },
    setIsUploadAttachmentOpen(state, action) {
      state.isUploadAttachmentOpen = action.payload;
    },
  },
});

export const { setAudios, setVideos, setPhotos, setIsUploadAttachmentOpen } =
  chatAttachmentSlice.actions;
export const ChatAttachment = chatAttachmentSlice.reducer;
