import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
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

const usePlaceDetailsApiCall =
  (): AxiosFetchWrapperResponse<PlaceDetailsApiCallData> => {
    const { user } = useLoginState();
    const config = useAxiosFetch<PlaceDetailsApiCallData>(
      "",
      undefined,
      `https://maps.googleapis.com/maps/api/place/details/json?fields=geometry&place_id=${user.current_location?.place_id}&key=${environmentConfig.GOOGLE_MAPS_API_KEY}`,
      user.current_location?.place_id === undefined ||
        !!user.current_location.coordinates,
    );

    return config;
  };

export default usePlaceDetailsApiCall;
