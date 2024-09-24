import { FlatList, ScrollView } from "react-native-gesture-handler";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import Gap from "@components/Gap/Gap";
import useRenderDirectoryItem from "./hooks/useRenderDirectoryItem";
import { DirectoryContainer } from "./DirectoryStyledComponents";
import useLoginState from "@pages/Login/hooks/useLoginState";
import Button from "@components/Button/Button";
import { useHandleChangeLocationButtonClick } from "./hooks/useHandleChangeLocationButtonClick";
import { Subtext } from "@components/Input/InputStyledComponents";
import { If } from "@components/If/If";
import { LocationsNearbyMapped, Privileges } from "@interfaces/CustomTypes";
import { PageEnum } from "@interfaces/NavigationTypes";

interface DirectoryProps {
  showNominateButton?: boolean;
  nearbyLocations: LocationsNearbyMapped;
  preferredDiveSites: number[];
  updatePreferredDiveSites: (diveSites: number[]) => void;
}

const Directory: React.FunctionComponent<DirectoryProps> = ({
  showNominateButton,
  nearbyLocations,
  preferredDiveSites,
  updatePreferredDiveSites,
}) => {
  const { user } = useLoginState();
  const navigation = useReactNavigation();
  const renderDirectoryItem = useRenderDirectoryItem(
    preferredDiveSites,
    updatePreferredDiveSites,
  );
  const handleChangeLocationButtonClick = useHandleChangeLocationButtonClick();

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
          data={Object.values(nearbyLocations).filter(
            (location) =>
              location.id && !preferredDiveSites.includes(location.id),
          )}
          scrollEnabled={false}
          renderItem={renderDirectoryItem}
          contentContainerStyle={{}}
        />
        <Gap level={1} />
        <If
          condition={
            user.privileges.includes(Privileges.SCOUT) && showNominateButton
          }>
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
