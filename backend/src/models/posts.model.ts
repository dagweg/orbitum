import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({});

export const Posts = mongoose.model("Posts", postsSchema);
