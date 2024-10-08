import { configureStore } from "@reduxjs/toolkit";
import { ChatSideBar } from "./slices/chat/chatSideBarSlice";
import { ChatArea } from "./slices/chat/chatAreaSlice";
import { User } from "./slices/user/userSlice";
import { Posts } from "./slices/post/postSlice";
import { ChatAudio } from "./slices/audio/chatAudioSlice";
import { ChatVideo } from "./slices/video/chatVideoSlice";
import { ChatMessage } from "./slices/message/chatMessageSlice";
import { ChatAttachment } from "./slices/attachment/chatAttachmentSlice";
import { enableMapSet } from "immer";
import { Notification } from "./slices/notification/notificationSlice";

enableMapSet();

export const store = configureStore({
  reducer: {
    User,
    ChatSideBar,
    ChatArea,
    Posts,
    ChatAudio,
    ChatVideo,
    ChatMessage,
    ChatAttachment,
    Notification,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
