import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  postComment,
} from "./postThunks";
import { TPostSchema } from "@/lib/types/schema";
import { User } from "../user/userSlice";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store";
import { TPost } from "@/app/types";

const initialState: TPostSchema[] = [];

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      console.log(action);
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      let { posts, user } = action.payload;
      // if (typeof posts == "object" && posts.length)
      posts.map((post: TPostSchema) => {
        if (post.likes.includes(user._id)) {
          post.liked = true;
        }
      });
      // console.log(posts);
      return posts;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {});

    builder.addCase(likePost.fulfilled, (state, action) => {
      const { likes, postId } = action.payload;
      return state.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            likes: likes,
            liked: !post.liked,
          };
        }
        return post;
      });
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

export const { setPosts } = posts.actions;
export const Posts = posts.reducer;
