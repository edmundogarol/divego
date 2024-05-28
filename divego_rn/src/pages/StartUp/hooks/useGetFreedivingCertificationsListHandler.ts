import { useEffect } from "react";
import useStartUpDispatch from "./useStartUpDispatch";
import useGetFreedivingCertificationsListApiCall from "./useGetFreedivingCertificationsListApiCall";

const useGetFreedivingCertificationsListHandler = (fetchCondition: boolean) => {
  const { updateCertificationsList } = useStartUpDispatch();
  const { fetch } = useGetFreedivingCertificationsListApiCall();

  useEffect(() => {
    if (fetchCondition) {
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
