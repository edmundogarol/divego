import { User } from "@interfaces/CustomTypes";
import useLoginState from "./useLoginState";
import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";

interface LoginSubmitApiCallData {
  user: User;
  logged_in: boolean;
}

const useLoginSubmitApiCall =
  (): AxiosFetchWrapperResponse<LoginSubmitApiCallData> => {
    const { loginForm } = useLoginState();
    const { fetch, data, loading, error } =
      useAxiosFetch<LoginSubmitApiCallData>("login/", {
        method: "POST",
        data: loginForm,
      });

    return { fetch, data, loading, error };
  };

export default useLoginSubmitApiCall;
