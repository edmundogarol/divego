import { mapZoom } from "@utils/utils";
import { PlaceDetailsApiCallData } from "./usePlaceDetailsApiCall";

export const useProcessPlaceDetailsToCoordinates = () => {
  return (placeDetailsData: PlaceDetailsApiCallData) => {
    const data = placeDetailsData.result;
    const ASPECT_RATIO = 1;

    const northeastLat = data?.geometry?.viewport.northeast.lat;
    const southwestLat = data?.geometry?.viewport.southwest.lat;

    return {
      lng: data?.geometry?.location.lng,
      lat: data?.geometry?.location.lat,
      latitudeDelta: mapZoom(2),
      longitudeDelta: mapZoom(2),
    };
  };
};

export default useProcessPlaceDetailsToCoordinates;
