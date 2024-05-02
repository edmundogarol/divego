import useApi from "@hooks/useApi";
import { DiveGoResponse } from "@hooks/useFetch";

interface LogoutkGetCallData {
  logged_in: boolean;
}

const useLogoutGetCall = (): (() => Promise<
  DiveGoResponse<LogoutkGetCallData>
>) => {
  const api = useApi<LogoutkGetCallData>();

  return () => api("logout/", { method: "GET" });
};

export default useLogoutGetCall;
