import { PageEnum } from "@interfaces/NavigationTypes";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Alert } from "react-native";

export const useHandleChangeLocationButtonClick = (): (() => void) => {
  const { user } = useLoginState();
  const navigation = useReactNavigation();

  return () => {
    Alert.alert(
      "Change Location",
      `Would you like to change your location? Currently in ${user.current_location?.description}`,
      [
        {
          text: "Cancel",
        },
        {
          text: "Change Location",
          onPress: () => navigation.navigate(PageEnum.ChangeCurrentLocation),
        },
      ],
    );
  };
};
