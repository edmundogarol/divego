import { CONTAINER_MARGIN_SMALL } from "@styles/constants";
import { useCallback } from "react";
import MapView, { Region } from "react-native-maps";
import useDirectoryState from "./useDirectoryState";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useDirectoryDispatch from "./useDirectoryDispatch";

export const useRenderMapNominationView = () => {
  const { user } = useLoginState();
  const { mapNominateLocation } = useDirectoryState();
  const { updateMapNominateLocation } = useDirectoryDispatch();
  const locationToUse = mapNominateLocation || user.current_location;

  const onRegionChange = (region: Region) => {
    updateMapNominateLocation({
      coordinates: {
        lng: region.longitude,
        lat: region.latitude,
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
      },
    });
  };

  console.log({ mapNominateLocation });
  return useCallback(
    ({ width, height }: { width: number; height: number }) => {
      const currentLocation = {
        latitude: locationToUse?.coordinates?.lat,
        longitude: locationToUse?.coordinates?.lng,
        latitudeDelta: locationToUse?.coordinates?.latitudeDelta,
        longitudeDelta: locationToUse?.coordinates?.longitudeDelta,
      } as Region;

      return (
        <MapView
          style={{
            height: height - CONTAINER_MARGIN_SMALL,
            width: width - CONTAINER_MARGIN_SMALL,
          }}
          onRegionChangeComplete={onRegionChange}
          region={currentLocation}></MapView>
      );
    },
    [
      mapNominateLocation?.main,
      mapNominateLocation?.place_id,
      mapNominateLocation?.coordinates?.lat,
      user.current_location?.main,
      user.current_location?.place_id,
      user.current_location?.coordinates?.lat,
    ],
  );
};
