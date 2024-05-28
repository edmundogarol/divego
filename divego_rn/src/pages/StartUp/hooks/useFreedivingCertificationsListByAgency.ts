import { useCallback } from "react";
import useStartUpState from "./useStartUpState";

export const useFreedivingCertificationsListByAgency = () => {
  const { certifications_list, agency } = useStartUpState();

  return useCallback(() => {
    if (agency !== null) {
      return (
        certifications_list
          ?.map((cert) => ({ value: cert[0], label: cert[1] }))
          .filter((cert) => {
            return cert.value.includes(agency as string);
          }) || []
      );
    } else {
      return [];
    }
  }, [agency]);
};
