import { createSlice } from "@reduxjs/toolkit";
import { TAudio, TFile, TImage, TVideo } from "@/app/types";

// export type TChatAttachment = {
//   audios: TAudio[] | [];
//   videos: TVideo[] | [];
//   photos: TImage[] | [];
// };

export type TChatAttachmentProps = {
  attachments: TFile[];
  isUploadAttachmentOpen: boolean;
};

let initialState: TChatAttachmentProps = {
  attachments: [],
  isUploadAttachmentOpen: false,
};

const chatAttachmentSlice = createSlice({
  name: "chatAttachment",
  initialState,
  reducers: {
    addAttachment(state, action: { payload: TFile }) {
      state.attachments.push(action.payload);
    },
    clearAttachments(state) {
      state.attachments = [];
    },
    removeAttachment(state, action: { payload: number }) {
      state.attachments = state.attachments.filter(
        (_, i) => i !== action.payload
      );
    },
    setIsUploadAttachmentOpen(state, action) {
      state.isUploadAttachmentOpen = action.payload;
    },
  },
});

export const {
  addAttachment,
  removeAttachment,
  clearAttachments,
  setIsUploadAttachmentOpen,
} = chatAttachmentSlice.actions;
export const ChatAttachment = chatAttachmentSlice.reducer;
