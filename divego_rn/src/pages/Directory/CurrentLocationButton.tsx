import { Text } from "react-native";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { CurrentLocationButtonContainer } from "./DirectoryStyledComponents";
import { useHandleChangeLocationButtonClick } from "./hooks/useHandleChangeLocationButtonClick";

const CurrentLocationButton: React.FunctionComponent<{
  noClick?: boolean;
}> = ({ noClick }) => {
  const { user } = useLoginState();
  const handleChangeLocationButtonClick = useHandleChangeLocationButtonClick();

  return (
    <CurrentLocationButtonContainer
      onPress={noClick ? null : handleChangeLocationButtonClick}>
      <Icon name="location-outline" type={IconTypeEnum.Ionicons} />
      <Text numberOfLines={1}>{user.current_location?.main}</Text>
    </CurrentLocationButtonContainer>
  );
};

export default CurrentLocationButton;
