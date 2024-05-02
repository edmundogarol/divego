import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@interfaces/CustomTypes";
import { LoginForm, SignUpForm } from "./LoginInterfaces";

export interface LoginState {
  readonly loading: boolean;
  readonly user: User;
  readonly loginForm: LoginForm;
  readonly loginFormErrors: { [key: string]: any };
  readonly signUpForm: SignUpForm;
  readonly signUpFormErrors: { [key: string]: any };
}

export const initialState: LoginState = {
  user: {
    id: undefined,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
    location: "",
    birth_date: "",
    logged_in: false,
    is_staff: false,
    verified: false,
  },
  loading: false,
  loginForm: {
    email: "",
    password: "",
  },
  loginFormErrors: {},
  signUpForm: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  },
  signUpFormErrors: {},
};

type UpdateLoadingAction = PayloadAction<boolean>;
type UpdateUserAction = PayloadAction<User>;
type UpdateLoginFormAction = PayloadAction<Partial<LoginForm>>;
type UpdateLoginFormErrorsAction = PayloadAction<{ [key: string]: any }>;
type UpdateSignUpFormAction = PayloadAction<Partial<SignUpForm>>;
type UpdateSignUpFormErrorsAction = PayloadAction<{ [key: string]: any }>;

export type LoginAction =
  | UpdateLoadingAction
  | UpdateUserAction
  | UpdateLoginFormAction
  | UpdateLoginFormErrorsAction
  | UpdateSignUpFormAction
  | UpdateSignUpFormErrorsAction;

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
    updateSignUpForm: (state, action: UpdateSignUpFormAction) => {
      state.signUpForm = { ...state.signUpForm, ...action.payload };
    },
    updateSignUpFormErrors: (state, action: UpdateSignUpFormErrorsAction) => {
      state.signUpFormErrors = action.payload;
    },
  },
});

export const {
  updateLoading,
  updateUser,
  updateLoginForm,
  updateLoginFormErrors,
  updateSignUpForm,
  updateSignUpFormErrors,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
