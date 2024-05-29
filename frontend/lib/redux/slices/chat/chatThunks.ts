import { API_ORIGIN } from "@/app/config/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Returns Users with matching email & usernames
export const chatSideBarSearch = createAsyncThunk(
  "chatSideBar/search",
  async (param: { query: string }, { rejectWithValue }) => {
    const { query } = param;
    try {
      const response = await fetch(
        `${API_ORIGIN}/api/v1/search/chat/sidebar?query=${query}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        return rejectWithValue(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
