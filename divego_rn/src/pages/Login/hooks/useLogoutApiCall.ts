import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";

interface LogoutApiCallData {
  logged_in: boolean;
}

const useLogoutApiCall =
  (): (() => AxiosFetchWrapperResponse<LogoutApiCallData>) => {
    const config = useAxiosFetch<LogoutApiCallData>("logout/", {
      method: "GET",
    });

    return () => config;
  };

export default useLogoutApiCall;
