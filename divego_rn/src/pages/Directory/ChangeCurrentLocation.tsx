import { LogBox, ScrollView, Text } from "react-native";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { DirectoryContainer } from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";
import { useEffect } from "react";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { useRenderMapView } from "./hooks/useRenderMapView";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { initialState } from "@pages/Login/LoginState";
import { useHandleUserCurrentLocationUpdateCallback } from "@hooks/location/useHandleUserCurrentLocationUpdateCallback";

const ChangeCurrentLocation: React.FunctionComponent = () => {
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
        horizontal={true}
        contentContainerStyle={{
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
        }}
        keyboardShouldPersistTaps={"handled"}>
        <Input
          googleAutoComplete
          style={{ zIndex: 2 }}
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
        {renderMapView()}
      </ScrollView>
    </DirectoryContainer>
  );
};

export default ChangeCurrentLocation;
