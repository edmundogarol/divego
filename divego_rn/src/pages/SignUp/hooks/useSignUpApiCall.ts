import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { User } from "@interfaces/CustomTypes";
import useLoginState from "@pages/Login/hooks/useLoginState";

interface SignUpPostApiData {
  user: User;
  logged_in: boolean;
}

const useSignUpApiCall =
  (): (() => AxiosFetchWrapperResponse<SignUpPostApiData>) => {
    const { signUpForm } = useLoginState();
    const config = useAxiosFetch<SignUpPostApiData>("user/", {
      method: "POST",
      data: signUpForm,
    });

    return () => config;
  };

export default useSignUpApiCall;
