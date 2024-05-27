import { API_ORIGIN } from "@/app/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "zod";

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_ORIGIN}/api/v1/user`, {
        credentials: "include",
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const likePost = createAsyncThunk(
  "user/likePost",
  async (param: { postId: string }, { rejectWithValue }) => {
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
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export { fetchUser, likePost };
