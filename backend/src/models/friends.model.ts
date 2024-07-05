import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const friendsSchema = new mongoose.Schema({
  user1: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
  },
});

export const Friends = mongoose.model("Friends", friendsSchema);
