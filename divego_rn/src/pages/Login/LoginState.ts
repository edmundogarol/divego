import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@interfaces/CustomTypes";
import { LoginForm } from "./LoginInterfaces";

export interface LoginState {
  readonly loading: boolean;
  readonly user?: User;
  readonly loginForm?: LoginForm;
}

const initialState: LoginState = {
  loading: false,
};

type UpdateLoadingAction = PayloadAction<boolean>;
type UpdateUserAction = PayloadAction<User>;
type UpdateLoginFormAction = PayloadAction<LoginForm>;

export type LoginAction =
  | UpdateLoadingAction
  | UpdateUserAction
  | UpdateLoginFormAction;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoading: (state, action: UpdateLoadingAction) => {
      state.loading = action.payload;
    },
    updateUser: (state, action: UpdateUserAction) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateLoginForm: (state, action: UpdateLoginFormAction) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
  },
});

export const { updateLoading, updateUser, updateLoginForm } =
  loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
