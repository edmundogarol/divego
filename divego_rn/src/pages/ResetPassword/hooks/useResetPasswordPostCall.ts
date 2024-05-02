import useApi from "@hooks/useApi";
import { DiveGoResponse } from "@hooks/useFetch";
import useLoginState from "@pages/Login/hooks/useLoginState";

const useResetPasswordPostCall = (): (() => Promise<DiveGoResponse<{}>>) => {
  const { resetPasswordForm } = useLoginState();
  const api = useApi<{}>();

  return () =>
    api("reset-password/", {
      method: "POST",
      body: JSON.stringify(resetPasswordForm),
    });
};

export default useResetPasswordPostCall;
