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

      loginCheckGetCall().then((response) => {
        if (response.ok) {
          if (response.data?.user) {
            updateUser({
              ...response.data?.user,
              logged_in: response.data?.logged_in,
            });
          } else;
          {
            updateUser(response.data as unknown as User);
          }
          updateLoading(false);
        } else {
          console.log("Login Check fetch error", JSON.stringify(response));
          updateLoading(false);
        }
      });
    }
  }, []);
};

export default useLoginCheck;
