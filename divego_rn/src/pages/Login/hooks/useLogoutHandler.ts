import useLoginDispatch from "./useLoginDispatch";
import { initialState } from "../LoginState";
import useLogoutApiCall from "./useLogoutApiCall";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const useLogoutHandler = () => {
  const { updateUser, updateLoginForm } = useLoginDispatch();
  const logout = useLogoutApiCall();
  const navigation = useNavigation();

  return async () => {
    const { fetch } = logout();
    const { data, error } = await fetch();

    if (data) {
      updateLoginForm(initialState.loginForm);
      navigation.dispatch(DrawerActions.closeDrawer());
      updateUser(initialState.user);
    } else {
      console.log("Logout fetch error", JSON.stringify(error));
    }
  };
};

export default useLogoutHandler;
