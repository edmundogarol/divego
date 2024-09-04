import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { Location } from "@interfaces/CustomTypes";
import {
  DirectoryAction,
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateNominateDiveSiteActiveIndex,
  updateSuggestedNearbyLocation,
} from "../DirectoryState";

interface DirectoryDispatch {
  updateMapCurrentLocation(mapCurrentLocation: Location | undefined): void;
  updateMapNominateLocation(mapNominateLocation: Location | undefined): void;
  updateSuggestedNearbyLocation(
    suggestedNearbyLocation: Location | undefined,
  ): void;
  updateNominateDiveSiteActiveIndex(activeIndex: number): void;
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
    updateNominateDiveSiteActiveIndex(activeIndex: number): void {
      dispatch(updateNominateDiveSiteActiveIndex(activeIndex));
    },
  };
};

export default useDirectoryDispatch;
