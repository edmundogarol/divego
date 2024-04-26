import { useEffect } from "react";
import useLoginState from "./useLoginState";
import useLoginCheckGetCall from "./useLoginCheckGetCall";
import useLoginDispatch from "./useLoginDispatch";
import { User } from "@interfaces/CustomTypes";

const useLoginCheck = () => {
  const { loading } = useLoginState();
  const { updateLoading, updateUser } = useLoginDispatch();
  const loginCheckGetCall = useLoginCheckGetCall();

  useEffect(() => {
    if (!loading) {
      updateLoading(true);

      loginCheckGetCall().then(({ data }) => {
        if (data) {
          updateUser(data as unknown as User);
          updateLoading(false);
        }
      });
    }
  }, []);
};

export default useLoginCheck;
