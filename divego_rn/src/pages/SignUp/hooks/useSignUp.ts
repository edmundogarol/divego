import { isNotEmptyString } from "@utils/utils";
import { set } from "lodash";
import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useSignUpPostCall from "./useSignUpPostCall";

const useSignUp = (): (() => void) => {
  const { loading, signUpForm } = useLoginState();
  const { updateLoading, updateUser, updateSignUpFormErrors } =
    useLoginDispatch();
  const signUpPostCall = useSignUpPostCall();
  const navigation = useReactNavigation();

  return () => {
    if (!loading) {
      updateLoading(true);

      if (
        !isNotEmptyString(signUpForm.email) ||
        !isNotEmptyString(signUpForm.password) ||
        !isNotEmptyString(signUpForm.first_name) ||
        !isNotEmptyString(signUpForm.last_name) ||
        !isNotEmptyString(signUpForm.confirm_password) ||
        (isNotEmptyString(signUpForm.confirm_password) &&
          signUpForm.confirm_password !== signUpForm.password)
      ) {
        const signUpFormErrorsLocal = {};
        if (!isNotEmptyString(signUpForm.email)) {
          set(signUpFormErrorsLocal, "email", "Please enter email");
        }
        if (!isNotEmptyString(signUpForm.password)) {
          set(signUpFormErrorsLocal, "password", "Please enter password");
        }
        if (!isNotEmptyString(signUpForm.first_name)) {
          set(signUpFormErrorsLocal, "first_name", "Please enter a first name");
        }
        if (!isNotEmptyString(signUpForm.last_name)) {
          set(signUpFormErrorsLocal, "last_name", "Please enter a last name");
        }
        if (!isNotEmptyString(signUpForm.confirm_password)) {
          set(
            signUpFormErrorsLocal,
            "confirm_password",
            "Please confirm password",
          );
        }
        if (
          isNotEmptyString(signUpForm.confirm_password) &&
          signUpForm.confirm_password !== signUpForm.password
        ) {
          set(
            signUpFormErrorsLocal,
            "confirm_password",
            "Passwords do not match",
          );
        }

        updateSignUpFormErrors(signUpFormErrorsLocal);
        updateLoading(false);
      } else {
        signUpPostCall().then((response) => {
          if (response.ok && response.data?.user) {
            updateUser({
              ...response.data?.user,
              logged_in: response.data?.logged_in,
            });
            updateLoading(false);
            navigation.navigate(PageEnum.Login);
          } else {
            if (response.data) {
              updateSignUpFormErrors({ ...response.data });
            } else {
              console.log("Sign Up Post fetch error", JSON.stringify(response));
            }
            updateLoading(false);
          }
        });
      }
    }
  };
};

export default useSignUp;
