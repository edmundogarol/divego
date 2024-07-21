import { useSelector } from "react-redux";
import { StoreState } from "@redux/interfaces";
import { DirectoryState } from "../DirectoryState";

const useDirectoryState = (): DirectoryState => {
  return useSelector((state: StoreState) => state.directory);
};

export default useDirectoryState;
