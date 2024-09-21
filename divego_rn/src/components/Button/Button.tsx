import React from "react";
import { PressableProps, TextStyle } from "react-native";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  ButtonText,
  HuggingOutlinedPressableWrapper,
  OutlinedPressableWrapper,
  PressableWrapper,
} from "./ButtonStyledComponents";
import Icon from "@components/Icon/Icon";
import { ButtonType } from "./ButtonInterfaces";

export interface ButtonWrapperProps extends PressableProps {
  type?: ButtonType;
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
  type = ButtonType.Block,
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
  let ButtonStyled = PressableWrapper;
  if (type === ButtonType.Outline) {
    ButtonStyled = OutlinedPressableWrapper;
  } else if (type === ButtonType.HuggingOutline) {
    ButtonStyled = HuggingOutlinedPressableWrapper;
  }

  return (
    <ButtonStyled
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
      <ButtonText buttonType={type} style={[textStyle]}>
        {text}
      </ButtonText>
      {iconRight ? (
        <Icon style={iconStyle} name={iconRight} type={iconType} />
      ) : null}
    </ButtonStyled>
  );
};

export default Button;
