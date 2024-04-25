import React from "react";
import { Pressable, PressableProps, Text, TextStyle } from "react-native";
import { ButtonText, PressableWrapper } from "./ButtonComponents";

export interface ButtonWrapperProps extends PressableProps {
  text?: string | React.ReactElement;
  label?: string;
  disabled?: boolean;
  textStyle?: TextStyle;
}

const Button: React.FunctionComponent<ButtonWrapperProps> = ({
  text,
  textStyle,
  style,
  disabled,
  onPress,
  ...props
}): React.ReactElement => {
  return (
    <PressableWrapper
      {...props}
      onPress={(e): void => {
        if (onPress) onPress(e);
      }}
      disabled={disabled}
      style={style}>
      <ButtonText style={[textStyle]}>{text}</ButtonText>
    </PressableWrapper>
  );
};

export default Button;
