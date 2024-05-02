import { useSelector } from "react-redux";
import { LoginState } from "../LoginState";
import { StoreState } from "@redux/interfaces";

const useLoginState = (): LoginState => {
  return useSelector((state: StoreState) => state.login);
};

export default useLoginState;
