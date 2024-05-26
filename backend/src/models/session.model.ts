import { ObjectId } from "mongodb";
import mongoose, { InferSchemaType, mongo } from "mongoose";
import { optional } from "zod";
import { dateHoursFromNow } from "../utils/date";

const sessionSchema = new mongoose.Schema({
  userId: { type: ObjectId, unique: true, ref: "User", require },
  // email: { type: String, unique: true, ref: "User", require },
  sessionToken: { type: String, require },
  expires: { type: Date, optional: true, default: dateHoursFromNow(24) },
});

export type SessionType = InferSchemaType<typeof sessionSchema>;
export const Session = mongoose.model<SessionType>("Session", sessionSchema);
