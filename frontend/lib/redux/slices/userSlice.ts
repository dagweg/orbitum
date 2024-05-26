import { API_ORIGIN } from "@/app/config/apiConfig";
import { TUserSchema } from "./../../../../backend/src/types/schema.d";
import { TUserSchema } from "@/lib/types/schema";
import {
  PayloadAction,
  Tuple,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// type TUserSession = {
//   email?: string;
//   sessionToken?: string;
// };

// const userSessionInitialState: TUserSession = {
//   email: undefined,
//   sessionToken: undefined,
// };

// const userSessionSlice = createSlice({
//   name: "userSession",
//   initialState: userSessionInitialState,
//   reducers: {
//     setUserEmail(state, action: PayloadAction<string | undefined>) {
//       state.email = action.payload;
//     },
//     setUserSessionId(state, action: PayloadAction<string | undefined>) {
//       state.sessionToken = action.payload;
//     },
//   },
// });

// export const { setUserEmail, setUserSessionId } = userSessionSlice.actions;
// export const userSessionReducer = userSessionSlice.reducer;

export const fetchUser = createAsyncThunk(`${API_ORIGIN}/api/v1/user`);

type TUserType = Omit<
  TUserSchema,
  "password" | "confirmPassword" | "otpExpiry" | "otp"
>;

const userInitialState: TUserType = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  stories: [],
  posts: [],
  settings: "",
  channelMemberships: [],
  groupMemberships: [],
  profileUrl: "",
  friends: [],
  confirmPassWord: "",
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
    builder.addCase(
      fetchUser.fullfilled,
      (state, action: PayloadAction<TUserSchema>) => {}
    );
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
