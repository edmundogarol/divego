import { useEffect } from "react";
import useDirectoryState from "./useDirectoryState";
import useGetPlacesNearbyApiCall from "./useGetPlacesNearbyApiCall";
import useDirectoryDispatch from "./useDirectoryDispatch";
import useProcessPlaceDetailsToCoordinates from "./useProcessPlaceDetailsToLocation";
import { PlaceDetailsApiCallData } from "./usePlaceDetailsApiCall";

const useNominateDiveSiteHandler = (): void => {
  const { mapNominateLocation } = useDirectoryState();
  const { updateSuggestedNearbyLocation } = useDirectoryDispatch();
  const getPlacesNearbyApiCall = useGetPlacesNearbyApiCall();
  const { fetch } = getPlacesNearbyApiCall(mapNominateLocation);
  const processPlaceDetailsToCoordinates =
    useProcessPlaceDetailsToCoordinates();

  useEffect(() => {
    fetch()
      .then(({ data: nearbyPlaces, error }) => {
        console.log({ nearbyPlaces });
        if (nearbyPlaces && nearbyPlaces.status === "ZERO_RESULTS") {
          updateSuggestedNearbyLocation({
            description: "Unknown Location",
            ...mapNominateLocation,
          });
        } else if (nearbyPlaces && nearbyPlaces.status !== "INVALID_REQUEST") {
          updateSuggestedNearbyLocation({
            place_id: nearbyPlaces.results[0].place_id,
            description: nearbyPlaces.results[0].name,
            coordinates: processPlaceDetailsToCoordinates({
              result: nearbyPlaces.results[0],
            } as unknown as PlaceDetailsApiCallData),
          });
        } else if (error) {
          console.error("Location details fetch error", error);
        } else if (nearbyPlaces && nearbyPlaces.status === "INVALID_REQUEST") {
          console.error(
            "Nearby places fetch error",
            nearbyPlaces?.error_message,
          );
        }
      })
      .catch((e) => {
        console.log({ error: e });
      });
  }, [mapNominateLocation]);
};

export default useNominateDiveSiteHandler;
