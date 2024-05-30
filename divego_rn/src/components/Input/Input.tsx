import React from "react";
import {
  Label,
  InputContainer,
  InputStyled,
  InputError,
  ErrorContainer,
  InputWrapper,
  Subtext,
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
  subtext?: string;
}

const Input: React.FunctionComponent<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  error,
  subtext,
  ...props
}) => {
  return (
    <InputWrapper>
      <If condition={!!label}>
        <Label disabled={disabled} error={!!error}>
          {label}
        </Label>
      </If>
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
      <If condition={!!subtext}>
        <Subtext>{subtext}</Subtext>
      </If>
    </InputWrapper>
  );
};
export default Input;
