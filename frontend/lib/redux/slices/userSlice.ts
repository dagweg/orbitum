import { PayloadAction, Tuple, createSlice } from "@reduxjs/toolkit";
import { TUserSchema } from "@_types/schema";

type TUserSession = {
  email?: string;
  sessionToken?: string;
};

const userSessionInitialState: TUserSession = {
  email: undefined,
  sessionToken: undefined,
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState: userSessionInitialState,
  reducers: {
    setUserEmail(state, action: PayloadAction<string | undefined>) {
      state.email = action.payload;
    },
    setUserSessionId(state, action: PayloadAction<string | undefined>) {
      console.log(action);
      state.sessionToken = action.payload;
    },
  },
});

export const { setUserEmail, setUserSessionId } = userSessionSlice.actions;
export const userSessionReducer = userSessionSlice.reducer;

type TUserType = Pick<
  TUserSchema,
  "firstName" | "lastName" | "email" | "userName" | "phoneNumber"
>;

const userInitialState: TUserType = {
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserType>) {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
