import BackButton from "@navigation/components/BackButton.native";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { deviceWidth, screenXs } from "@styles/media";
import { Platform } from "react-native";

export const getCommonHeaderOptions = (): StackNavigationOptions => {
  return {
    headerShown: true,
    headerLeft: BackButton,
    headerTitle: "",
    headerTintColor: "black",
    headerTitleStyle: {
      maxWidth:
        Platform.OS === "ios"
          ? deviceWidth > screenXs
            ? "100%"
            : 180
          : deviceWidth > screenXs
          ? "100%"
          : 220,
    },
  };
};

export const useCommonHeaderOptions = (): StackNavigationOptions => {
  return getCommonHeaderOptions();
};
