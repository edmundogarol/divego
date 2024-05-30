import React from "react";
import {
  Label,
  InputContainer,
  InputStyled,
  InputError,
  ErrorContainer,
  InputWrapper,
} from "./InputStyledComponents";
import { TextInputProps } from "react-native";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";

export interface InputWrapperProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  error?: string;
}

const Input: React.FunctionComponent<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  error,
  ...props
}) => {
  return (
    <InputWrapper>
      <Label disabled={disabled} error={!!error}>
        {label}
      </Label>
      <InputContainer error={!!error}>
        <If condition={!!icon}>{icon}</If>
        <InputStyled
          {...props}
          placeholder={placeholder}
          placeholderTextColor={
            !!error ? color("SystemError2") : color("SystemLabel1")
          }
          editable={!disabled}
        />
      </InputContainer>
      <If condition={!!error}>
        <ErrorContainer>
          <Icon
            style={{ color: color("SystemError2") }}
            name={"error"}
            type={IconTypeEnum.MaterialIcons}
          />
          <InputError>{error}</InputError>
        </ErrorContainer>
      </If>
    </InputWrapper>
  );
};
export default Input;
