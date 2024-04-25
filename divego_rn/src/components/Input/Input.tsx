import React from "react";
import { Label, InputContainer, InputStyled } from "./InputStyledComponents";
import { TextInputProps } from "react-native";
import { If } from "@components/If/If";

export interface InputWrapperProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
}

const Input: React.FunctionComponent<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  ...props
}) => {
  return (
    <>
      <Label>{label}</Label>
      <InputContainer>
        <If condition={!!icon}>{icon}</If>
        <InputStyled
          {...props}
          placeholder={placeholder}
          editable={!disabled}
        />
      </InputContainer>
    </>
  );
};
export default Input;
