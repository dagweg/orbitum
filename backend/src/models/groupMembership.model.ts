import mongoose from "mongoose";

const groupMembershipSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
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

export const GroupMembership = mongoose.model(
  "GroupMembership",
  groupMembershipSchema
);
