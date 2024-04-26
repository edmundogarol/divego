import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import {
  LoginAction,
  updateLoading,
  updateLoginForm,
  updateUser,
} from "../LoginState";
import { User } from "@interfaces/CustomTypes";
import { LoginForm } from "../LoginInterfaces";

interface LoginDispatch {
  updateLoading(loading: boolean): void;
  updateUser(user: User): void;
  updateLoginForm(loginForm: LoginForm): void;
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
    updateLoginForm(loginForm: LoginForm): void {
      dispatch(updateLoginForm(loginForm));
    },
  };
};

export default useLoginDispatch;
