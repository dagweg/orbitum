import mongoose from "mongoose";

const storiesSchema = new mongoose.Schema({});

export const Stories = mongoose.model("Stories", storiesSchema);
