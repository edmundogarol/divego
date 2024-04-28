import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  LoginAction,
  updateLoading,
  updateLoginForm,
  updateLoginFormErrors,
  updateUser,
} from "../LoginState";
import { User } from "@interfaces/CustomTypes";

interface LoginDispatch {
  updateLoading(loading: boolean): void;
  updateUser(user: User): void;
  updateLoginForm(loginForm: { [key: string]: any }): void;
  updateLoginFormErrors(loginFormError: { [key: string]: any }): void;
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
    updateLoginForm(loginForm: { [key: string]: any }): void {
      dispatch(updateLoginForm(loginForm));
    },
    updateLoginFormErrors(loginFormError: { [key: string]: any }): void {
      dispatch(updateLoginFormErrors(loginFormError));
    },
  };
};

export default useLoginDispatch;
