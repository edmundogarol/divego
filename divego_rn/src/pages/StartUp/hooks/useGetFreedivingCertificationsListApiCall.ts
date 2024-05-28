import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";

type FreedivingCertificationsListApiCallData = Array<Array<string>>;

const useGetFreedivingCertificationsListApiCall =
  (): AxiosFetchWrapperResponse<FreedivingCertificationsListApiCallData> => {
    const { fetch, data, loading, error } =
      useAxiosFetch<FreedivingCertificationsListApiCallData>(
        "freedive/certifications/",
      );

    return { fetch, data, loading, error };
  };

export default useGetFreedivingCertificationsListApiCall;
