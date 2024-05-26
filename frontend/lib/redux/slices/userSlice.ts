import { API_ORIGIN } from "@/app/config/apiConfig";
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
      fetchUser.fulfilled,
      (state, action: PayloadAction<TUserSchema>) => {
        return action.payload;
      }
    );
  },
});

export const { setUser } = userSlice.actions;
export { fetchUser };
export const userReducer = userSlice.reducer;
