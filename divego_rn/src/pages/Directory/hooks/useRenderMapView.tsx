import useLoginState from "@pages/Login/hooks/useLoginState";
import { useCallback } from "react";
import MapView, { Region } from "react-native-maps";

export const useRenderMapView = () => {
  const { user } = useLoginState();

  return useCallback(() => {
    return (
      <MapView
        style={{ height: 300, width: 300 }}
        initialRegion={
          user.current_location
            ? ({
                latitude: user.current_location?.coordinates?.lat,
                longitude: user.current_location?.coordinates?.lng,
                latitudeDelta:
                  user.current_location?.coordinates?.latitudeDelta,
                longitudeDelta:
                  user.current_location?.coordinates?.longitudeDelta,
              } as Region)
            : undefined
        }
      />
    );
  }, [user.current_location, user.current_location?.coordinates?.lat]);
};
