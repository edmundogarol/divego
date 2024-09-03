import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { Location } from "@interfaces/CustomTypes";
import {
  DirectoryAction,
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateSuggestedNearbyLocation,
} from "../DirectoryState";

interface DirectoryDispatch {
  updateMapCurrentLocation(mapCurrentLocation: Location | undefined): void;
  updateMapNominateLocation(mapNominateLocation: Location | undefined): void;
  updateSuggestedNearbyLocation(
    suggestedNearbyLocation: Location | undefined,
  ): void;
}

export const useDirectoryDispatch = (): DirectoryDispatch => {
  const dispatch: Dispatch<DirectoryAction> = useDispatch();
  return {
    updateMapCurrentLocation(mapCurrentLocation: Location | undefined): void {
      dispatch(updateMapCurrentLocation(mapCurrentLocation));
    },
    updateMapNominateLocation(mapNominateLocation: Location | undefined): void {
      dispatch(updateMapNominateLocation(mapNominateLocation));
    },
    updateSuggestedNearbyLocation(
      suggestedNearbyLocation: Location | undefined,
    ): void {
      dispatch(updateSuggestedNearbyLocation(suggestedNearbyLocation));
    },
  };
};

export default useDirectoryDispatch;
