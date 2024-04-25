import { useEffect } from "react";
import useLoginState from "./useLoginState";
import useLoginDispatch from "./useLoginDispatch";

const useCheckLogin = (): void => {
  const { isLoggedIn } = useLoginState();
  const { setLoggedIn } = useLoginDispatch();

  useEffect((): void => {
    if (!isLoggedIn) {
      storage.get(StorageKeyEnum.AccessToken).then((accessToken) => {
        if (accessToken) {
          storage.get(StorageKeyEnum.RefreshToken).then((refreshToken) => {
            if (refreshToken) {
              setLoggedIn(true);
            }
          });
        }
      });
    }
  }, [isLoggedIn]);
};

export default useCheckLogin;
