import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { LoginAction, updateLoading } from "../LoginState";

interface LoginDispatch {
  updateLoading(loading: boolean): void;
}

export const useLoginDispatch = (): LoginDispatch => {
  const dispatch: Dispatch<LoginAction> = useDispatch();
  return {
    updateLoading(loading): void {
      dispatch(updateLoading(loading));
    },
  };
};

export default useLoginDispatch;
