import { Dimensions } from "react-native";
import { PlaceDetailsApiCallData } from "./usePlaceDetailsApiCall";

export const useProcessPlaceDetailsToCoordinates = () => {
  return (placeDetailsData: PlaceDetailsApiCallData) => {
    const data = placeDetailsData.result;
    const { width, height } = Dimensions.get("window");
    // const ASPECT_RATIO = width / height;
    const ASPECT_RATIO = 1;

    const northeastLat = data?.geometry?.viewport.northeast.lat;
    const southwestLat = data?.geometry?.viewport.southwest.lat;
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;

    return {
      lng: data?.geometry?.location.lng,
      lat: data?.geometry?.location.lat,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };
};

export default useProcessPlaceDetailsToCoordinates;
