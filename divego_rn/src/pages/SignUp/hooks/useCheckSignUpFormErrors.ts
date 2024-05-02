import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { isNotEmptyString } from "@utils/utils";
import { useEffect } from "react";

const useCheckSignUpFormErrors = (): void => {
  const { signUpForm, signUpFormErrors } = useLoginState();
  const { updateSignUpFormErrors } = useLoginDispatch();

  useEffect(() => {
    if (
      isNotEmptyString(signUpForm.first_name) &&
      signUpFormErrors.first_name
    ) {
      const { first_name, ...errors } = signUpFormErrors;
      updateSignUpFormErrors(errors);
    }
    if (isNotEmptyString(signUpForm.last_name) && signUpFormErrors.last_name) {
      const { last_name, ...errors } = signUpFormErrors;
      updateSignUpFormErrors(errors);
    }
    if (isNotEmptyString(signUpForm.email) && signUpFormErrors.email) {
      const { email, ...errors } = signUpFormErrors;
      updateSignUpFormErrors(errors);
    }
    if (isNotEmptyString(signUpForm.password) && signUpFormErrors.password) {
      const { password, ...errors } = signUpFormErrors;
      updateSignUpFormErrors(errors);
    }
    if (
      (isNotEmptyString(signUpForm.confirm_password) ||
        signUpForm.confirm_password === signUpForm.password) &&
      signUpFormErrors.confirm_password
    ) {
      const { confirm_password, ...errors } = signUpFormErrors;
      updateSignUpFormErrors(errors);
    }
  }, [signUpForm]);
};

export default useCheckSignUpFormErrors;
