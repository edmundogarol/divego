import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@interfaces/CustomTypes";
import { LoginForm } from "./LoginInterfaces";

export interface LoginState {
  readonly loading: boolean;
  readonly user?: User;
  readonly loginForm: LoginForm;
  readonly loginFormErrors: { [key: string]: any };
}

const initialState: LoginState = {
  loading: false,
  loginForm: {
    email: "",
    password: "",
  },
  loginFormErrors: {},
};

type UpdateLoadingAction = PayloadAction<boolean>;
type UpdateUserAction = PayloadAction<User>;
type UpdateLoginFormAction = PayloadAction<{ [key: string]: any }>;
type UpdateLoginFormErrorsAction = PayloadAction<{ [key: string]: any }>;

export type LoginAction =
  | UpdateLoadingAction
  | UpdateUserAction
  | UpdateLoginFormAction
  | UpdateLoginFormErrorsAction;

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
    updateLoginFormErrors: (state, action: UpdateLoginFormErrorsAction) => {
      state.loginFormErrors = action.payload;
    },
  },
});

export const {
  updateLoading,
  updateUser,
  updateLoginForm,
  updateLoginFormErrors,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
