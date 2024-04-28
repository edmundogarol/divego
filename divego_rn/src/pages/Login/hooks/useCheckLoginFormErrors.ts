import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";
import { isNotEmptyString } from "@utils/utils";
import { useEffect } from "react";

const useCheckLoginFormErrors = (): void => {
  const { loginForm, loginFormErrors } = useLoginState();
  const { updateLoginFormErrors } = useLoginDispatch();

  useEffect(() => {
    if (isNotEmptyString(loginForm.email) && loginFormErrors.email) {
      const { email, ...errors } = loginFormErrors;
      updateLoginFormErrors(errors);
    }
    if (isNotEmptyString(loginForm.password) && loginFormErrors.password) {
      const { password, ...errors } = loginFormErrors;
      updateLoginFormErrors(errors);
    }
  }, [loginForm]);
};

export default useCheckLoginFormErrors;
