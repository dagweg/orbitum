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
      let {
        posts,
        user,
      }: { posts: TPostSchemaResponse[]; user: { _id: string } } =
        action.payload;
      console.log(posts);

      for (const post of posts) {
        const likes = new Map(Object.entries(post.likes));
        console.log(likes);
      }

      let newPosts: IPostSchema[] = [];
      if (typeof posts == "object" && posts.length)
        newPosts = posts.map((post: TPostSchemaResponse) => {
          const likes = new Map(Object.entries(post.likes));
          if (likes.has(user._id)) {
            post.liked = true;
          }
          post.likes = likes;
          return post;
        }) as IPostSchema[];
      return newPosts;
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

export const { setPosts } = postSlice.actions;
export const Posts = postSlice.reducer;
