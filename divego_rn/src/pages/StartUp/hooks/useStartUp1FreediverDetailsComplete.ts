import { useCallback } from "react";
import useStartUpState from "./useStartUpState";
import { FreediveAgencyEnum } from "@interfaces/CustomTypes";

const useStartUp1FreediverDetailsComplete = (): (() => boolean) => {
  const { freediver: startUpFreediver, agency } = useStartUpState();

  return useCallback(() => {
    return (
      !!agency &&
      !!startUpFreediver.freediver_type &&
      (!!startUpFreediver.certification_number ||
        agency === FreediveAgencyEnum.NonCertified) &&
      (!!startUpFreediver.certification ||
        agency === FreediveAgencyEnum.NonCertified ||
        agency === FreediveAgencyEnum.Other)
    );
  }, [startUpFreediver]);
};

export default useStartUp1FreediverDetailsComplete;
