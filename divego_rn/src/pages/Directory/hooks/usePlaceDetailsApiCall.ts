import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { Location } from "@interfaces/CustomTypes";
import useLoginState from "@pages/Login/hooks/useLoginState";
import environmentConfig from "@utils/environmentConfig";
import { useCallback } from "react";

export interface PlaceDetailsApiCallData {
  result: {
    geometry: {
      location: {
        lng: number;
        lat: number;
      };
      viewport: {
        northeast: {
          lng: number;
          lat: number;
        };
        southwest: {
          lng: number;
          lat: number;
        };
      };
    };
  };
  status: string;
  error_message?: string;
}

const usePlaceDetailsApiCall = (): ((
  location: Location | undefined,
) => AxiosFetchWrapperResponse<PlaceDetailsApiCallData>) => {
  return (location: Location | undefined) => {
    const config = useAxiosFetch<PlaceDetailsApiCallData>(
      "",
      undefined,
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${location?.place_id}&key=${environmentConfig.GOOGLE_MAPS_API_KEY}`,
      location?.place_id === undefined || !!location.coordinates,
    );

    return config;
  };
};

export default usePlaceDetailsApiCall;
