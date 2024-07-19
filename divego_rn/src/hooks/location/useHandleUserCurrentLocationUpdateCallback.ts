import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";

export const useHandleUserCurrentLocationUpdateCallback = (): ((
  text: string,
) => void) => {
  return (text: string) => {};
};
