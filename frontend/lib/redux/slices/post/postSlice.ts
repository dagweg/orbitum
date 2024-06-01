import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getUserPosts, likePost } from "./postThunks";
import { TPostSchema } from "@/lib/types/schema";
import { User } from "../user/userSlice";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store";

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
      const { posts, user } = action.payload;
      posts.map((post: TPostSchema) => {
        if (post.likes.includes(user._id)) {
          post.liked = true;
        }
      });
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
  },
});

export const { setPosts } = posts.actions;
export const Posts = posts.reducer;