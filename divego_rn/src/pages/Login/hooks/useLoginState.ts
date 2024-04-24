import { useSelector } from "react-redux";
import { StoreState } from "src/redux/interfaces";
import { LoginState } from "../LoginState";

const useLoginState = (): LoginState => {
  return useSelector((state: StoreState) => state.login);
};

export default useLoginState;
