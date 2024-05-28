import { useSelector } from "react-redux";
import { StoreState } from "@redux/interfaces";
import { StartUpState } from "../StartUpState";

const useStartUpState = (): StartUpState => {
  return useSelector((state: StoreState) => state.startUp);
};

export default useStartUpState;
