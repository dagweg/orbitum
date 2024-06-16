import { TUserSchema } from "@/lib/types/schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { changeProfilePicture, fetchUser } from "./userThunks";
import { base64ToBlob } from "@/util/file";

type TUserType = Pick<
  TUserSchema,
  | "_id"
  | "userName"
  | "email"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "settings"
  | "profilePicture"
>;

const userInitialState: TUserType = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  settings: "",
  profilePicture: {
    base64: "",
    name: "",
    type: "",
  },
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
    builder.addCase(changeProfilePicture.fulfilled, (state, action) => {
      state.profilePicture = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export const User = userSlice.reducer;
