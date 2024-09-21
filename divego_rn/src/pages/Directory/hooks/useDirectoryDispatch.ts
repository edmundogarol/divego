import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { Location, LocationsNearbyMapped } from "@interfaces/CustomTypes";
import {
  DirectoryAction,
  updateDiveSiteActiveAmenities,
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateNearbyLocations,
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
  updateDiveSiteActiveAmenities(amenity: string): void;
  updateNearbyLocations(nearbyLocations: LocationsNearbyMapped): void;
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
    updateDiveSiteActiveAmenities(amenity: string): void {
      dispatch(updateDiveSiteActiveAmenities(amenity));
    },
    updateNearbyLocations(nearbyLocations: LocationsNearbyMapped): void {
      dispatch(updateNearbyLocations(nearbyLocations));
    },
  };
};

export default useDirectoryDispatch;
