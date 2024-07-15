import { TImage, TUser } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./notificationThunks";

export type TNotification = {
  user: TUser;
  title: string;
  description?: string;
  link?: string;
  date: Date;
  thumbnail?: TImage;
};

export type TNotificationProps = {
  notifications: TNotification[];
  new_notifications_count: number;
  total_notifications: number;
};

const initialState: TNotificationProps = {
  notifications: [],
  new_notifications_count: 0,
  total_notifications: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(action.payload);
      state.new_notifications_count++;
      state.total_notifications++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      const { notifications, new_notifications_count, total_notifications } =
        action.payload;
      state.notifications = notifications;
      state.new_notifications_count = new_notifications_count;
      state.total_notifications = total_notifications;
    });
  },
});

export const { addNotification } = notificationSlice.actions;
export const Notification = notificationSlice.reducer;
