import useLoginState from "@pages/Login/hooks/useLoginState";
import { CONTAINER_MARGIN_SMALL } from "@styles/constants";
import { useCallback } from "react";
import MapView, { Region, Marker } from "react-native-maps";
import DiverMarkerImage from "@assets/images/diver_marker.png";
import useDirectoryState from "./useDirectoryState";

export const useRenderMapView = () => {
  const { user } = useLoginState();
  const { mapCurrentLocation } = useDirectoryState();
  const locationToUse = mapCurrentLocation || user.current_location;

  return useCallback(
    ({ width, height }: { width: number; height: number }) => {
      const currentLocation = locationToUse
        ? ({
            latitude: locationToUse?.coordinates?.lat,
            longitude: locationToUse?.coordinates?.lng,
            latitudeDelta: locationToUse?.coordinates?.latitudeDelta,
            longitudeDelta: locationToUse?.coordinates?.longitudeDelta,
          } as Region)
        : undefined;

      return (
        <MapView
          style={{
            height: height - CONTAINER_MARGIN_SMALL,
            width: width - CONTAINER_MARGIN_SMALL,
          }}
          region={currentLocation}>
          <Marker
            coordinate={currentLocation as Region}
            image={DiverMarkerImage}
            style={{ transform: "scale(0.4)" }}
          />
        </MapView>
      );
    },
    [
      user.current_location?.main,
      user.current_location?.place_id,
      user.current_location?.coordinates?.lat,
      mapCurrentLocation?.main,
      mapCurrentLocation?.place_id,
      mapCurrentLocation?.coordinates?.lat,
    ],
  );
};
