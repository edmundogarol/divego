import useApi from "@hooks/useApi";
import { DiveGoResponse } from "@hooks/useFetch";
import { User } from "@interfaces/CustomTypes";
import useLoginState from "@pages/Login/hooks/useLoginState";

interface SignUpPostCallData {
  user: User;
  logged_in: boolean;
}

const useSignUpPostCall = (): (() => Promise<
  DiveGoResponse<SignUpPostCallData>
>) => {
  const { signUpForm } = useLoginState();
  const api = useApi<SignUpPostCallData>();

  return () =>
    api("user/", {
      method: "POST",
      body: JSON.stringify(signUpForm),
    });
};

export default useSignUpPostCall;
