import useLoginState from "@pages/Login/hooks/useLoginState";
import { CONTAINER_MARGIN_SMALL } from "@styles/constants";
import { useCallback } from "react";
import MapView, { Region, Marker } from "react-native-maps";

export const useRenderMapView = () => {
  const { user } = useLoginState();

  return useCallback(
    ({ width, height }: { width: number; height: number }) => {
      const currentLocation = user.current_location
        ? ({
            latitude: user.current_location?.coordinates?.lat,
            longitude: user.current_location?.coordinates?.lng,
            latitudeDelta: user.current_location?.coordinates?.latitudeDelta,
            longitudeDelta: user.current_location?.coordinates?.longitudeDelta,
          } as Region)
        : undefined;

      return (
        <MapView
          style={{
            height: height - CONTAINER_MARGIN_SMALL,
            width: width - CONTAINER_MARGIN_SMALL,
          }}
          region={currentLocation}>
          <Marker coordinate={currentLocation as Region} />
        </MapView>
      );
    },
    [
      user.current_location?.main,
      user.current_location?.place_id,
      user.current_location?.coordinates?.lat,
    ],
  );
};
