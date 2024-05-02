import Button from "@components/Button/Button";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React from "react";
import { Platform } from "react-native";
import { Style } from "./BackButtonStyles";

interface BackButtonProps {
  onPress?: () => void;
}

const BackButton: React.FunctionComponent<BackButtonProps> = ({
  onPress,
}): React.ReactElement => {
  const navigate = useReactNavigation();

  return (
    <Button
      style={{ width: "auto" }}
      iconLeft={Platform.OS === "ios" ? "chevron-back" : "arrow-left"}
      iconType={
        Platform.OS === "ios"
          ? IconTypeEnum.Ionicons
          : IconTypeEnum.MaterialCommunityIcons
      }
      transparent
      textStyle={Style.textStyle}
      iconStyle={Style.iconStyle}
      text={Platform.OS === "ios" ? "Back" : ""}
      onPress={(): void => (onPress ? onPress() : navigate.goBack())}
    />
  );
};

export default BackButton;
