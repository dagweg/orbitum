import mongoose, { InferSchemaType } from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});
export type TNotification = InferSchemaType<typeof notificationSchema>;
export const Notification = mongoose.model<TNotification>(
  "Notification",
  notificationSchema
);
