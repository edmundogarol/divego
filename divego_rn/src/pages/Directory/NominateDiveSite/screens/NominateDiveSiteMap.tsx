import React from "react";
import { LogBox, ScrollView, Text } from "react-native";
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
} from "../../DirectoryStyledComponents";
import { useEffect, useState } from "react";
import Button from "@components/Button/Button";
import useDirectoryState from "../../hooks/useDirectoryState";
import useDirectoryDispatch from "../../hooks/useDirectoryDispatch";
import DiverMarkerImage from "@assets/images/diver_marker.png";
import { useRenderMapNominationView } from "../../hooks/useRenderMapNominationView";
import useNominateDiveSiteHandler from "../../hooks/useNominateDiveSiteHandler";
import useNominatedLocationPlaceDetailsHandlerView from "../../hooks/useNominatedLocationPlaceDetailsHandlerView";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";

const NominateDiveSiteMap: React.FunctionComponent<ScreenRenderProps> = ({
  gotoNextPage,
}) => {
  const { active_index, suggestedNearbyLocation } = useDirectoryState();
  const { updateMapNominateLocation, updateSuggestedNearbyLocation } =
    useDirectoryDispatch();
  const [mapDims, setMapDims] = useState({
    width: 0,
    height: 0,
  });
  const [search, toggleSearch] = useState(false);
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();
  const renderMapView = useRenderMapNominationView();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useNominateDiveSiteHandler();
  useNominatedLocationPlaceDetailsHandlerView();
  useCustomScreenOptions({
    title: <Text>{"Nominate Dive Site"}</Text>,
    backButtonOnPress: () => {
      updateMapNominateLocation(undefined);
      updateSuggestedNearbyLocation(undefined);
      navigation.goBack();
    },
    onClose: () => {
      updateMapNominateLocation(undefined);
      updateSuggestedNearbyLocation(undefined);
    },
    rightButtonOnPress: () => gotoNextPage(),
    rightButtonText: "Next",
    rightButtonDisabled: !suggestedNearbyLocation,
    depList: [suggestedNearbyLocation, active_index],
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
          debounce={1000}
          onFocus={() => toggleSearch(!search)}
          googleAutoComplete={search}
          style={{ zIndex: 3, flex: 1 }}
          placeholder="Enter Dive Site Location"
          icon={renderInputIcon(
            "search",
            IconTypeEnum.FontAwesome,
            false,
            () => {
              toggleSearch(!search);
            },
          )}
          subtext={
            "Nominating a dive site will first go through verification before listing in the Dive Directory"
          }
          onGoogleAutoCompleteChange={(data) => {
            updateMapNominateLocation({
              place_id: data.place_id,
              description: data.description,
              main: data.structured_formatting.main_text,
              coordinates: undefined,
            });
            toggleSearch(!search);
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
          {suggestedNearbyLocation?.description || "Unknown Location"}
        </CurrentLocationText>
        <Gap level={2} />
        <Button
          disabledBlock={!suggestedNearbyLocation?.description}
          text={"Nominate New Dive Site"}
          onPress={() => {
            gotoNextPage();
          }}
        />
      </ScrollView>
    </DirectoryContainer>
  );
};

export default NominateDiveSiteMap;
