import useApi from "@hooks/useApi";
import { DiveGoResponse } from "@hooks/useFetch";
import { User } from "@interfaces/CustomTypes";
import useLoginState from "./useLoginState";

interface LoginPostCallData {
  user: User;
  logged_in: boolean;
}

const useLoginPostCall = (): (() => Promise<
  DiveGoResponse<LoginPostCallData>
>) => {
  const { loginForm } = useLoginState();
  const api = useApi<LoginPostCallData>();

  return () =>
    api("login/", { method: "POST", body: JSON.stringify(loginForm) });
};

export default useLoginPostCall;
