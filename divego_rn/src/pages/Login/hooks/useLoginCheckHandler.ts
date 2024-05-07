import { useEffect } from "react";
import { LoginCheckApiCallData } from "./useLoginCheckApiCall";
import useLoginDispatch from "./useLoginDispatch";
import { User } from "@interfaces/CustomTypes";
import { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";

const useLoginCheckHandler = ({
  data,
  loading,
  error,
}: AxiosFetchWrapperResponse<LoginCheckApiCallData>) => {
  const { updateUser } = useLoginDispatch();

  useEffect(() => {
    if (data) {
      if (data?.user) {
        updateUser({
          ...data?.user,
          logged_in: data?.logged_in,
        });
      } else {
        updateUser(data as unknown as User);
      }
    } else if (error) {
      console.log("Login check fetch error", error);
    }
  }, [data, error, loading]);
};

export default useLoginCheckHandler;
