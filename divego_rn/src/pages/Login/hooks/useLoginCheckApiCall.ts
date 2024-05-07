import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { User } from "@interfaces/CustomTypes";
import { useEffect } from "react";

export interface LoginCheckApiCallData {
  user: User;
  logged_in: boolean;
}

const useLoginCheckApiCall =
  (): AxiosFetchWrapperResponse<LoginCheckApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<LoginCheckApiCallData>("login/");

    useEffect(() => {
      fetch();
    }, []);

    return { fetch, data, loading, error };
  };

export default useLoginCheckApiCall;
