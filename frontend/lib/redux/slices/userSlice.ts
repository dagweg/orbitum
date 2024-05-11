import { PayloadAction, Tuple, createSlice } from "@reduxjs/toolkit";

type TUser = {
  email?: string;
  sessionId?: string;
};

const initialState: TUser = {
  email: undefined,
  sessionId: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action: PayloadAction<string | undefined>) {
      state.email = action.payload;
    },
    setUserSession(state, action: PayloadAction<string | undefined>) {
      state.sessionId = action.payload;
    },
  },
});

export const { setUserEmail, setUserSession } = userSlice.actions;
export const userReducer = userSlice.reducer;
