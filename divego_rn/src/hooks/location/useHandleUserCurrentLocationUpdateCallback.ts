import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { initialState } from "@pages/Login/LoginState";

export const useHandleUserCurrentLocationUpdateCallback = (): ((
  text: string,
) => void) => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();

  return (text: string) => {
    if (text === "" && user.current_location?.description !== "") {
      updateUser({
        ...user,
        current_location: {
          ...initialState.user.current_location,
          description: text,
        },
      });
    }
  };
};
