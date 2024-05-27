import { TUserSchema } from "@/lib/types/schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUser, likePost } from "./userThunks";

type TUserType = Pick<
  TUserSchema,
  | "userName"
  | "email"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "settings"
  | "profileUrl"
>;

const userInitialState: TUserType = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  settings: "",
  profileUrl: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserType>) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
