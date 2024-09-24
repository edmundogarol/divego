import { Text } from "react-native";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import Directory from "@pages/Directory/Directory";
import CurrentLocationButton from "@pages/Directory/CurrentLocationButton";
import useDirectoryState from "@pages/Directory/hooks/useDirectoryState";
import useStartUpDispatch from "@pages/StartUp/hooks/useStartUpDispatch";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";

const StartUpDirectory: React.FunctionComponent = () => {
  const { user } = useLoginState();
  const navigation = useReactNavigation();
  const { nearbyLocations } = useDirectoryState();
  const { preferredDiveSites } = useStartUpState();
  const { updatePreferredDiveSites } = useStartUpDispatch();

  useCustomScreenOptions({
    title: <Text>{"Dive Directory"}</Text>,
    backButtonOnPress: () => navigation.goBack(),
    rightButton: <CurrentLocationButton location={user.current_location} />,
    depList: [user.current_location],
  });

  return (
    <Directory
      nearbyLocations={nearbyLocations}
      preferredDiveSites={preferredDiveSites}
      updatePreferredDiveSites={updatePreferredDiveSites}
    />
  );
};

export default StartUpDirectory;
