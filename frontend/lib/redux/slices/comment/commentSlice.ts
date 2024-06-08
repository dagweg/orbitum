import { createSlice } from "@reduxjs/toolkit";

type TComments = {};

const initialState: TComments = {};

const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
});

export const {} = comments.actions;
export const Comments = comments.reducer;
