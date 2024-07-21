import { useEffect } from "react";
import usePlaceDetailsApiCall from "./usePlaceDetailsApiCall";
import useProcessPlaceDetailsToLocation from "./useProcessPlaceDetailsToLocation";
import useDirectoryState from "./useDirectoryState";
import useDirectoryDispatch from "./useDirectoryDispatch";

const useCurrentLocationPlaceDetailsHandlerView = (): void => {
  const { mapCurrentLocation } = useDirectoryState();
  const { updateMapCurrentLocation } = useDirectoryDispatch();
  const processPlaceDetailsToLocation = useProcessPlaceDetailsToLocation();
  const placeDetailsApiCall = usePlaceDetailsApiCall();
  const { fetch } = placeDetailsApiCall(mapCurrentLocation);

  useEffect(() => {
    if (!mapCurrentLocation?.coordinates?.lat) {
      fetch().then(({ data: placeDetails, error }) => {
        if (placeDetails && placeDetails.status !== "INVALID_REQUEST") {
          updateMapCurrentLocation({
            ...mapCurrentLocation,
            coordinates: processPlaceDetailsToLocation(placeDetails),
          });
        } else if (error) {
          console.error("Location details fetch error", error);
        } else if (placeDetails && placeDetails.status === "INVALID_REQUEST") {
          console.error(
            "Location details fetch error",
            placeDetails?.error_message,
          );
        }
      });
    }
  }, [mapCurrentLocation?.place_id]);
};

export default useCurrentLocationPlaceDetailsHandlerView;
