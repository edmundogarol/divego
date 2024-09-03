import { useEffect } from "react";
import usePlaceDetailsApiCall from "./usePlaceDetailsApiCall";
import useProcessPlaceDetailsToLocation from "./useProcessPlaceDetailsToLocation";
import useDirectoryState from "./useDirectoryState";
import useDirectoryDispatch from "./useDirectoryDispatch";

const useNominatedLocationPlaceDetailsHandlerView = (): void => {
  const { mapNominateLocation } = useDirectoryState();
  const { updateMapNominateLocation } = useDirectoryDispatch();
  const processPlaceDetailsToLocation = useProcessPlaceDetailsToLocation();
  const placeDetailsApiCall = usePlaceDetailsApiCall();
  const { fetch } = placeDetailsApiCall(mapNominateLocation);

  useEffect(() => {
    if (!mapNominateLocation?.coordinates?.lat) {
      fetch().then(({ data: placeDetails, error }) => {
        if (placeDetails && placeDetails.status !== "INVALID_REQUEST") {
          updateMapNominateLocation({
            ...mapNominateLocation,
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
  }, [mapNominateLocation?.place_id]);
};

export default useNominatedLocationPlaceDetailsHandlerView;
