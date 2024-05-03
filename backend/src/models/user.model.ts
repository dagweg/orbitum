import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Settings } from "./settings.model";

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true, require: true },
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: String },
  profileUrl: { type: String },
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

export const User = mongoose.model("User", userSchema);
