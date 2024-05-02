import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";
import { initialState } from "../LoginState";
import useLogoutGetCall from "./useLogoutGetCall";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const useLogout = () => {
  const { loading } = useLoginState();
  const { updateLoading, updateUser, updateLoginForm } = useLoginDispatch();
  const logoutGetCall = useLogoutGetCall();
  const navigation = useNavigation();

  return () => {
    if (!loading) {
      updateLoading(true);

      logoutGetCall().then((response) => {
        if (response.ok) {
          updateUser(initialState.user);
          updateLoginForm(initialState.loginForm);
          updateLoading(false);
          navigation.dispatch(DrawerActions.closeDrawer());
        } else {
          console.log("Logout fetch error", JSON.stringify(response));
          updateLoading(false);
        }
      });
    }
  };
};

export default useLogout;
