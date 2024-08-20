import React from "react";
import { Image, LogBox, ScrollView, Text, View } from "react-native";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  CurrentLocationMapContainer,
  CurrentLocationText,
  DirectoryContainer,
  SetPinMarker,
} from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";
import { useEffect, useState } from "react";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useRenderMapView } from "./hooks/useRenderMapView";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { initialState } from "@pages/Login/LoginState";
import Button from "@components/Button/Button";
import useDirectoryState from "./hooks/useDirectoryState";
import useDirectoryDispatch from "./hooks/useDirectoryDispatch";
import useCurrentLocationPlaceDetailsHandlerView from "./hooks/useCurrentLocationPlaceDetailsHandlerView";
import DiverMarkerImage from "@assets/images/diver_marker.png";
import { useRenderMapNominationView } from "./hooks/useRenderMapNominationView";

const NominateDiveSite: React.FunctionComponent = () => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { mapCurrentLocation } = useDirectoryState();
  const { updateMapCurrentLocation } = useDirectoryDispatch();
  const [mapDims, setMapDims] = useState({
    width: 0,
    height: 0,
  });
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();
  const renderMapView = useRenderMapNominationView();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useCurrentLocationPlaceDetailsHandlerView();
  useCustomScreenOptions({
    title: <Text>{"Nominate Dive Site"}</Text>,
    backButtonOnPress: () => {
      // updateMapCurrentLocation(undefined);
      navigation.goBack();
    },
    // rightButton: (
    //   <CurrentLocationButton
    //     noClick
    //     location={mapCurrentLocation || user.current_location}
    //   />
    // ),
    // onClose: () => updateMapCurrentLocation(undefined),
    // depList: [user.current_location, mapCurrentLocation],
  });

  return (
    <DirectoryContainer>
      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
        }}
        keyboardShouldPersistTaps={"handled"}>
        <Input
          googleAutoComplete
          style={{ zIndex: 3, flex: 1 }}
          placeholder="Enter Dive Site Location"
          icon={renderInputIcon("search", IconTypeEnum.FontAwesome, false)}
          subtext={
            "Nominating a dive site will first go through verification before listing in the Dive Directory"
          }
          onGoogleAutoCompleteChange={(data) => {
            // updateMapCurrentLocation({
            //   place_id: data.place_id,
            //   description: data.description,
            //   main: data.structured_formatting.main_text,
            //   coordinates: initialState.user.current_location?.coordinates,
            // });
          }}
        />
        <Gap level={1} />
        <CurrentLocationMapContainer
          style={{ position: "relative" }}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setMapDims({ width, height });
          }}>
          <SetPinMarker source={DiverMarkerImage} />
          {renderMapView(mapDims)}
        </CurrentLocationMapContainer>
        <Gap level={2} />
        <CurrentLocationText>
          {mapCurrentLocation?.description ||
            user.current_location?.description}
        </CurrentLocationText>
        <Gap level={2} />
        <Button
          disabledBlock={!mapCurrentLocation?.description}
          text={"Place Site Pin"}
          onPress={() => {
            console.log({ mapCurrentLocation });
            if (mapCurrentLocation?.description) {
              updateUser({
                ...user,
                current_location: mapCurrentLocation,
              });
              updateMapCurrentLocation(undefined);
              navigation.goBack();
            }
          }}
        />
      </ScrollView>
    </DirectoryContainer>
  );
};

export default NominateDiveSite;
