import { PlaceDetailsApiCallData } from "./usePlaceDetailsApiCall";

export const useProcessPlaceDetailsToCoordinates = () => {
  return (placeDetailsData: PlaceDetailsApiCallData) => {
    const data = placeDetailsData.result;
    // const ASPECT_RATIO = width / height;
    const ASPECT_RATIO = 1;

    const northeastLat = data?.geometry?.viewport.northeast.lat;
    const southwestLat = data?.geometry?.viewport.southwest.lat;
    // const latDelta = northeastLat - southwestLat;
    // const lngDelta = latDelta * ASPECT_RATIO;
    const latDelta = 0.0019;
    const lngDelta = 0.0019;

    return {
      lng: data?.geometry?.location.lng,
      lat: data?.geometry?.location.lat,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  };
};

export default useProcessPlaceDetailsToCoordinates;
