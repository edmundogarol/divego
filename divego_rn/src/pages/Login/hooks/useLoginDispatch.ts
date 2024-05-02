import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  LoginAction,
  updateLoading,
  updateLoginForm,
  updateLoginFormErrors,
  updateSignUpForm,
  updateSignUpFormErrors,
  updateUser,
} from "../LoginState";
import { User } from "@interfaces/CustomTypes";
import { LoginForm, SignUpForm } from "../LoginInterfaces";

interface LoginDispatch {
  updateLoading(loading: boolean): void;
  updateUser(user: User): void;
  updateLoginForm(loginForm: Partial<LoginForm>): void;
  updateLoginFormErrors(loginFormError: { [key: string]: any }): void;
  updateSignUpForm(signUpForm: Partial<SignUpForm>): void;
  updateSignUpFormErrors(signUpFormError: { [key: string]: any }): void;
}

export const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch<LoginAction> = useDispatch();
  return {
    updateLoading(loading): void {
      dispatch(updateLoading(loading));
    },
    updateUser(user: User): void {
      dispatch(updateUser(user));
    },
    updateLoginForm(loginForm: Partial<LoginForm>): void {
      dispatch(updateLoginForm(loginForm));
    },
    updateLoginFormErrors(loginFormError: { [key: string]: any }): void {
      dispatch(updateLoginFormErrors(loginFormError));
    },
    updateSignUpForm(signUpForm: Partial<SignUpForm>): void {
      dispatch(updateSignUpForm(signUpForm));
    },
    updateSignUpFormErrors(signUpFormError: { [key: string]: any }): void {
      dispatch(updateSignUpFormErrors(signUpFormError));
    },
  };
};

export default useLoginDispatch;
