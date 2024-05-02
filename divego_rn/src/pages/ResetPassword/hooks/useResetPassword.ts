import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useResetPasswordPostCall from "./useResetPasswordPostCall";

const useResetPassword = (): (() => void) => {
  const { loading, resetPasswordForm } = useLoginState();
  const {
    updateLoading,
    updateResetPasswordErrors,
    updateResetPasswordFormSent,
  } = useLoginDispatch();
  const resetPasswordPostCall = useResetPasswordPostCall();

  return () => {
    if (!loading) {
      updateLoading(true);

      if (!isNotEmptyString(resetPasswordForm.email)) {
        const resetPasswordFormErrorsLocal = {};
        if (!isNotEmptyString(resetPasswordForm.email)) {
          set(resetPasswordFormErrorsLocal, "email", "Please enter email");
        }

        updateResetPasswordErrors(resetPasswordFormErrorsLocal);
        updateLoading(false);
      } else {
        resetPasswordPostCall().then((response) => {
          if (response.ok && response.data) {
            updateLoading(false);
            updateResetPasswordFormSent(true);
            // navigation.navigate(PageEnum.Login);
          } else {
            if (response.data) {
              updateResetPasswordErrors({ ...response.data });
            } else {
              console.log(
                "Reset Password Post fetch error",
                JSON.stringify(response),
              );
            }
            updateResetPasswordFormSent(false);
            updateLoading(false);
          }
        });
      }
    }
  };
};

export default useResetPassword;
