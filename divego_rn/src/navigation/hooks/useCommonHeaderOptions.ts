import BackButton from "@navigation/components/BackButton";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { color } from "@styles/colors";
import { deviceWidth, screenXs } from "@styles/media";
import { debugStylesBorder } from "@utils/utils";
import { Platform } from "react-native";

export const getCommonHeaderOptions = (): StackNavigationOptions => {
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: color("SystemBackground1"),
    },
    headerLeft: BackButton,
    headerTitle: "",
    headerTintColor: "black",
    headerTitleStyle: {
      ...debugStylesBorder("red"),
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
