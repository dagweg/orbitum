import { API_ORIGIN } from "@/app/config/apiConfig";
import { TImage, TProfilePic } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { string } from "zod";

export const fetchUser = createAsyncThunk(
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

export const changeProfilePicture = createAsyncThunk(
  "user/changeProfilePicture",
  async (param: TProfilePic, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ORIGIN}/api/v1/user/settings/profile`, {
        method: "put",
        body: JSON.stringify(param),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data.user.profilePicture;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
