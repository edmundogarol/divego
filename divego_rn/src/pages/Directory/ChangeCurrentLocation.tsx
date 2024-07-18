import { LogBox, ScrollView, Text } from "react-native";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { DirectoryContainer } from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";
import MapView, { Region } from "react-native-maps";
import { useEffect } from "react";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useCurrentLocationPlaceDetailsHandler from "./hooks/useCurrentLocationPlaceDetailsHandler";

const ChangeCurrentLocation: React.FunctionComponent = () => {
  const navigation = useReactNavigation();
  const renderInputIcon = useRenderInputIcon();
  const { user } = useLoginState();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useCustomScreenOptions({
    title: <Text>{"Current Location"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
    rightButton: <CurrentLocationButton noClick />,
  });

  console.log({ user_coordinates: user.current_location?.coordinates });

  return (
    <DirectoryContainer>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
        }}
        keyboardShouldPersistTaps={"handled"}>
        <Input
          style={{ zIndex: 2 }}
          placeholder="Enter Dive Site Location"
          icon={renderInputIcon("search", IconTypeEnum.FontAwesome, false)}
          googleAutoComplete
          subtext={
            "Setting current location will suggest dive sites within a 10km radius"
          }
          onGoogleAutoCompleteChange={(data) => {}}
        />
        <Gap level={1} />
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
      </ScrollView>
    </DirectoryContainer>
  );
};

export default ChangeCurrentLocation;
