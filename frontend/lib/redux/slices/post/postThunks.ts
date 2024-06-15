import { API_ORIGIN } from "@/app/config/apiConfig";
import { TPost } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ORIGIN}/api/v1/user/post`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const posts = await response.json();
      return posts;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      let response = await fetch(`${API_ORIGIN}/api/v1/posts`, {
        credentials: "include",
      });
      const posts = await response.json();

      response = await fetch(`${API_ORIGIN}/api/v1/user`, {
        credentials: "include",
      });
      const user = await response.json();

      return { posts, user } as any;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const likePost = createAsyncThunk(
  "user/likePost",
  async (param: { postId: string }, { dispatch, rejectWithValue }) => {
    try {
      const { postId } = param;
      const res = await fetch(`${API_ORIGIN}/api/v1/posts/like`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });
      const data = await res.json();
      data.postId = postId;
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const postComment = createAsyncThunk(
  "comments/post",
  async (param: { postId: string; comment: string }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ORIGIN}/api/v1/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          postId: param.postId,
          comment: param.comment,
        }),
      });

      if (!res.ok) {
        return rejectWithValue(res);
      }

      const data = await res.json();
      console.log("COMMENT SUCCESS ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const createPost = createAsyncThunk(
  "post/create",
  async (param: TPost, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ORIGIN}/api/v1/posts`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(param),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("FETCHED THIS ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export { getUserPosts, getAllPosts, likePost, createPost };
