import { useEffect } from "react";
import usePlaceDetailsApiCall from "./usePlaceDetailsApiCall";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useProcessPlaceDetailsToLocation from "./useProcessPlaceDetailsToLocation";

const useCurrentLocationPlaceDetailsHandler = (): void => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const processPlaceDetailsToLocation = useProcessPlaceDetailsToLocation();
  const { fetch } = usePlaceDetailsApiCall();

  useEffect(() => {
    if (!user.current_location?.coordinates?.lat) {
      fetch().then(({ data: placeDetails, error }) => {
        if (placeDetails && placeDetails.status !== "INVALID_REQUEST") {
          updateUser({
            ...user,
            current_location: {
              ...user.current_location,
              coordinates: processPlaceDetailsToLocation(placeDetails),
            },
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
  }, [user.current_location?.place_id]);
};

export default useCurrentLocationPlaceDetailsHandler;
