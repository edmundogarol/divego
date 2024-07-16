import { Text } from "react-native";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { CurrentLocationContainer } from "./DirectoryStyledComponents";

const CurrentLocation: React.FunctionComponent = () => {
  const { user } = useLoginState();

  console.log({ user });
  return (
    <CurrentLocationContainer>
      <Icon name="location-outline" type={IconTypeEnum.Ionicons} />
      <Text>{user.current_location?.main}</Text>
    </CurrentLocationContainer>
  );
};

export default CurrentLocation;
