import { ObjectId } from "mongodb";
import mongoose, { InferSchemaType } from "mongoose";
import { Settings } from "./settings.model";

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true, require: true },
  email: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profileUrl: { type: String },
  otp: { type: String, default: null },
  otpExpiry: { type: Date },
  emailVerified: { type: Boolean, default: false },
  settings: {
    type: ObjectId,
    ref: Settings,
  },
  friends: [
    {
      type: ObjectId,
      ref: "Friends",
    },
  ],
  groupMemberships: [
    {
      type: ObjectId,
      ref: "GroupMembership",
    },
  ],
  channelMemberships: [
    {
      type: ObjectId,
      ref: "ChannelMembership",
    },
  ],
  posts: [
    {
      type: ObjectId,
      ref: "Posts",
    },
  ],
  stories: [
    {
      type: ObjectId,
      ref: "Stories",
    },
  ],
});

type UserDocument = InferSchemaType<typeof userSchema>;
export const User = mongoose.model<UserDocument>("User", userSchema);
