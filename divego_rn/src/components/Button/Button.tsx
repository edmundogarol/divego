import React from "react";
import { PressableProps, TextStyle } from "react-native";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import { ButtonText, PressableWrapper } from "./ButtonStyledComponents";
import Icon from "@components/Icon/Icon";

export interface ButtonWrapperProps extends PressableProps {
  text?: string | React.ReactElement;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  disabledBlock?: boolean;
  textStyle?: TextStyle;
  iconStyle?: TextStyle;
  iconType?: IconTypeEnum;
  iconLeft?: IconGlyph;
  iconRight?: IconGlyph;
  transparent?: boolean;
}

const Button: React.FunctionComponent<ButtonWrapperProps> = ({
  text,
  textStyle,
  iconLeft,
  iconRight,
  iconStyle,
  style,
  disabled,
  disabledBlock,
  transparent,
  onPress,
  loading,
  iconType = IconTypeEnum.FontAwesome,
  ...props
}): React.ReactElement => {
  return (
    <PressableWrapper
      loading={loading}
      {...props}
      onPress={(e): void => {
        if (onPress) onPress(e);
      }}
      disabledBlock={disabledBlock}
      transparent={transparent}
      style={style}>
      {iconLeft ? (
        <Icon style={iconStyle} name={iconLeft} type={iconType} />
      ) : null}
      <ButtonText style={[textStyle]}>{text}</ButtonText>
      {iconRight ? (
        <Icon style={iconStyle} name={iconRight} type={iconType} />
      ) : null}
    </PressableWrapper>
  );
};

export default Button;
