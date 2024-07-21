import { Text } from "react-native";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { CurrentLocationButtonContainer } from "./DirectoryStyledComponents";
import { useHandleChangeLocationButtonClick } from "./hooks/useHandleChangeLocationButtonClick";
import { Location } from "@interfaces/CustomTypes";

const CurrentLocationButton: React.FunctionComponent<{
  location?: Location;
  noClick?: boolean;
}> = ({ noClick, location }) => {
  const handleChangeLocationButtonClick = useHandleChangeLocationButtonClick();

  return (
    <CurrentLocationButtonContainer
      onPress={noClick ? null : handleChangeLocationButtonClick}>
      <Icon name="location-outline" type={IconTypeEnum.Ionicons} />
      <Text numberOfLines={1}>{location?.main}</Text>
    </CurrentLocationButtonContainer>
  );
};

export default CurrentLocationButton;
