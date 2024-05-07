import mongoose from "mongoose";

const channelMembershipSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["owner", "member", "moderator"],
    default: "member",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChannelMembership = mongoose.model(
  "ChannelMembership",
  channelMembershipSchema
);
