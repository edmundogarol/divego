import useApi from "@hooks/useApi";
import { DiveGoResponse } from "@hooks/useFetch";
import { User } from "@interfaces/CustomTypes";

interface LoginCheckGetCallData {
  user: User;
  logged_in: boolean;
}

const useLoginCheckGetCall = (): (() => Promise<
  DiveGoResponse<LoginCheckGetCallData>
>) => {
  const api = useApi<LoginCheckGetCallData>();

  return () => api("login/", { method: "GET" });
};

export default useLoginCheckGetCall;
