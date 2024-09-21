import { Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import Gap from "@components/Gap/Gap";
import useRenderDirectoryItem from "./hooks/useRenderDirectoryItem";
import { DirectoryContainer } from "./DirectoryStyledComponents";
import CurrentLocationButton from "./CurrentLocationButton";
import useLoginState from "@pages/Login/hooks/useLoginState";
import Button from "@components/Button/Button";
import { useHandleChangeLocationButtonClick } from "./hooks/useHandleChangeLocationButtonClick";
import { Subtext } from "@components/Input/InputStyledComponents";
import { If } from "@components/If/If";
import { Privileges } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";
import useDirectoryState from "./hooks/useDirectoryState";

const Directory: React.FunctionComponent = () => {
  const { user } = useLoginState();
  const navigation = useReactNavigation();
  const { nearbyLocations } = useDirectoryState();
  const renderDirectoryItem = useRenderDirectoryItem();
  const handleChangeLocationButtonClick = useHandleChangeLocationButtonClick();

  useCustomScreenOptions({
    title: <Text>{"Dive Directory"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
    rightButton: <CurrentLocationButton location={user.current_location} />,
    depList: [user.current_location],
  });

  return (
    <DirectoryContainer>
      <ScrollView scrollEnabled={true}>
        <Button
          text={"Change Current Location"}
          onPress={() => handleChangeLocationButtonClick()}
        />
        <Gap level={1} />
        <Subtext>
          {"Showing suggestions within a 10km radius from current location"}
        </Subtext>
        <FlatList
          data={Object.values(nearbyLocations)}
          scrollEnabled={false}
          renderItem={renderDirectoryItem}
          contentContainerStyle={{}}
        />
        <Gap level={1} />
        <If condition={user.privileges.includes(Privileges.SCOUT)}>
          <Button
            text={"Nominate Dive Site"}
            onPress={() => navigation.navigate(PageEnum.NominateDiveSite)}
          />
          <Gap level={1} />
          <Subtext>
            {
              "It seems like you are one of our special 'Scout' divers. You can nominate new dive sites! Your nominations of potential dive sites can get listed on our directory pending verifications."
            }
          </Subtext>
        </If>
      </ScrollView>
    </DirectoryContainer>
  );
};

export default Directory;
