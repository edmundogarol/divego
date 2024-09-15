import useAxiosFetch, { AxiosFetchWrapperResponse } from "@hooks/useAxiosFetch";
import { Location, LocationPhoto } from "@interfaces/CustomTypes";
import environmentConfig from "@utils/environmentConfig";

export interface NearbyPlacesDetailsApiCallData {
  results: [
    {
      name: string;
      business_status: string;
      place_id: string;
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
      photos: LocationPhoto[];
    },
  ];
  status: string;
  error_message?: string;
}

const useGetPlacesNearbyApiCall = (): ((
  location: Location | undefined,
) => AxiosFetchWrapperResponse<NearbyPlacesDetailsApiCallData>) => {
  return (location: Location | undefined) => {
    const config = useAxiosFetch<NearbyPlacesDetailsApiCallData>(
      "",
      undefined,
      encodeURI(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=point_of_interest&location=${location?.coordinates?.lat},${location?.coordinates?.lng}&radius=30&key=${environmentConfig.GOOGLE_MAPS_API_KEY}`,
      ),
      !location || (location && !location.coordinates),
    );

    return config;
  };
};

export default useGetPlacesNearbyApiCall;
