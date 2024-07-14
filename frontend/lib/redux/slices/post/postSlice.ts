import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  postComment,
} from "./postThunks";
import { IPostSchema, TPostSchemaResponse } from "@/lib/types/schema";
import { User } from "../user/userSlice";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store";
import { TPost } from "@/app/types";

const initialState: IPostSchema[] = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state, action) {
      console.log(action);
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      let { posts, user }: { posts: IPostSchema[]; user: { _id: string } } =
        action.payload;

      return posts;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {});

    builder.addCase(likePost.fulfilled, (state, action) => {
      const { likes, postId, liked, likes_count } = action.payload;
      // console.log(likes);
      const likedPostIndex = state.findIndex((post) => post._id === postId);
      state[likedPostIndex].likes = likes;
      state[likedPostIndex].liked = liked;
      state[likedPostIndex].likes_count = likes_count;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      const pid = state.findIndex((post) => post._id === action.payload.post);
      state[pid].comments.push(action.payload);
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      if (action.payload) {
        return [action.payload, ...state];
      }
    });
  },
});

export const { setPosts } = postSlice.actions;
export const Posts = postSlice.reducer;
