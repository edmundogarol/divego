import Button from "@components/Button/Button";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import React from "react";
import { Platform } from "react-native";
import { Style } from "./BackButtonStyles";
import { Else, If } from "@components/If/If";

interface BackButtonProps {
  onPress?: () => void;
  text?: string;
  forward?: boolean;
  disabled?: boolean;
}

const BackButton: React.FunctionComponent<BackButtonProps> = ({
  onPress,
  text,
  forward,
  disabled,
}): React.ReactElement => {
  const navigate = useReactNavigation();
  let icon: IconGlyph | undefined;
  let iconType: IconTypeEnum;
  let buttonText: string;

  if (Platform.OS === "ios") {
    icon = "chevron-back";
    iconType = IconTypeEnum.Ionicons;
    buttonText = "Back";

    if (forward) {
      icon = "chevron-forward";
      buttonText = "Next";
    }
  } else {
    icon = "arrow-left";
    iconType = IconTypeEnum.MaterialCommunityIcons;
    buttonText = "";

    if (forward) {
      icon = "arrow-right";
      buttonText = "Next";
    }
  }

  return (
    <If condition={forward}>
      <Button
        disabled={disabled}
        style={{ width: "auto" }}
        iconRight={icon}
        iconType={iconType}
        transparent
        textStyle={disabled ? Style.disabledText : Style.textStyle}
        iconStyle={disabled ? Style.disabledIcon : Style.iconStyle}
        text={text ? text : buttonText}
        onPress={(): void => (onPress ? onPress() : navigate.goBack())}
      />
      <Else>
        <Button
          disabled={disabled}
          style={{ width: "auto" }}
          iconLeft={icon}
          iconType={iconType}
          transparent
          textStyle={disabled ? Style.disabledText : Style.textStyle}
          iconStyle={disabled ? Style.disabledIcon : Style.iconStyle}
          text={text ? text : buttonText}
          onPress={(): void => (onPress ? onPress() : navigate.goBack())}
        />
      </Else>
    </If>
  );
};

export default BackButton;
