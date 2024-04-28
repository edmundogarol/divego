import { useEffect } from "react";
import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";
import { User } from "@interfaces/CustomTypes";
import useLoginPostCall from "./useLoginPostCall";
import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";

const useLogin = (): (() => void) => {
  const { loading, loginForm } = useLoginState();
  const { updateLoading, updateUser, updateLoginFormErrors } =
    useLoginDispatch();
  const loginPostcall = useLoginPostCall();

  return () => {
    if (!loading) {
      updateLoading(true);

      if (
        !isNotEmptyString(loginForm.email) ||
        !isNotEmptyString(loginForm.password)
      ) {
        const loginFormErrorsLocal = {};
        if (!isNotEmptyString(loginForm.email)) {
          set(loginFormErrorsLocal, "email", "Please enter email");
        }
        if (!isNotEmptyString(loginForm.password)) {
          set(loginFormErrorsLocal, "password", "Please enter password");
        }
        updateLoginFormErrors(loginFormErrorsLocal);
        updateLoading(false);
      } else {
        loginPostcall().then((response) => {
          if (response.ok) {
            updateUser(response.data as unknown as User);
            updateLoading(false);
          } else {
            if (response.data) {
              updateLoginFormErrors({ ...response.data });
            } else {
              console.log("Login Post fetch error", JSON.stringify(response));
            }
            updateLoading(false);
          }
        });
      }
    }
  };
};

export default useLogin;
