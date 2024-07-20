import { Dimensions, LogBox, ScrollView, Text } from "react-native";
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
} from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";
import { useEffect, useState } from "react";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useRenderMapView } from "./hooks/useRenderMapView";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { initialState } from "@pages/Login/LoginState";
import { useHandleUserCurrentLocationUpdateCallback } from "@hooks/location/useHandleUserCurrentLocationUpdateCallback";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import Button from "@components/Button/Button";
import { G } from "react-native-svg";

const ChangeCurrentLocation: React.FunctionComponent = () => {
  const [mapDims, setMapDims] = useState({
    width: 0,
    height: 0,
  });
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const renderMapView = useRenderMapView();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useCustomScreenOptions({
    title: <Text>{"Current Location"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
    rightButton: <CurrentLocationButton noClick />,
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
            "Setting current location will suggest dive sites within a 10km radius"
          }
          onGoogleAutoCompleteChange={(data) => {
            updateUser({
              ...user,
              current_location: {
                ...user.current_location,
                place_id: data.place_id,
                description: data.description,
                main: data.structured_formatting.main_text,
                coordinates: initialState.user.current_location?.coordinates,
              },
            });
          }}
        />
        <Gap level={1} />
        <CurrentLocationMapContainer
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setMapDims({ width, height });
          }}>
          {renderMapView(mapDims)}
        </CurrentLocationMapContainer>
        <Gap level={2} />
        <CurrentLocationText>
          {user.current_location?.description}
        </CurrentLocationText>
        <Gap level={2} />
        <Button
          disabled={!user.current_location}
          text={"Set Current Location"}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </DirectoryContainer>
  );
};

export default ChangeCurrentLocation;
