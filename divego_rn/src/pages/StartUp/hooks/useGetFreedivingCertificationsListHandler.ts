import { useEffect } from "react";
import useStartUpDispatch from "./useStartUpDispatch";
import useGetFreedivingCertificationsListApiCall from "./useGetFreedivingCertificationsListApiCall";
import useStartUpState from "./useStartUpState";

const useGetFreedivingCertificationsListHandler = (fetchCondition: boolean) => {
  const { certifications_list } = useStartUpState();
  const { updateCertificationsList } = useStartUpDispatch();
  const { fetch } = useGetFreedivingCertificationsListApiCall();

  useEffect(() => {
    if (fetchCondition && !certifications_list?.length) {
      fetch().then(({ data, error }) => {
        if (data) {
          updateCertificationsList(data);
        } else if (error) {
          console.log("Certification list fetch error", error);
        }
      });
    }
  }, [fetchCondition]);
};

export default useGetFreedivingCertificationsListHandler;
