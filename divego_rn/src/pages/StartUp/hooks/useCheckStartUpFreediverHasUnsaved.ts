import useLoginState from "@pages/Login/hooks/useLoginState";
import useStartUpState from "./useStartUpState";

const useCheckStartUpFreediverHasUnsaved = (): (() => boolean) => {
  const { freediver: accFreediver } = useLoginState();
  const { freediver: startUpFreediver, agency } = useStartUpState();

  return () => {
    if (
      !accFreediver?.id &&
      (!!startUpFreediver?.certification ||
        !!startUpFreediver?.freediver_type ||
        !!agency)
    ) {
      return true;
    }
    return false;
  };
};

export default useCheckStartUpFreediverHasUnsaved;
