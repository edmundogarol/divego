import React from "react";
import {
  Label,
  ErrorContainer,
  SelectContainer,
  SelectError,
  IconContainer,
  SelectInputContainer,
  SelectWrapper,
} from "./SelectStyledComponents";
import { Dimensions } from "react-native";
import { If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { styles } from "./SelectStyles";
const { width } = Dimensions.get("screen");
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

export interface SelectWrapperProps extends PickerSelectProps {
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  endIcon?: React.ReactElement;
  error?: string;
}

const Select: React.FunctionComponent<SelectWrapperProps> = ({
  label,
  disabled,
  icon,
  endIcon,
  placeholder,
  error,
  items,
  onValueChange,
  ...props
}) => {
  return (
    <SelectWrapper>
      <Label error={!!error}>{label}</Label>
      <SelectContainer error={!!error}>
        <If condition={!!icon}>
          <IconContainer>{icon}</IconContainer>
        </If>
        <SelectInputContainer>
          <RNPickerSelect
            {...props}
            placeholder={{
              ...styles.placeholder,
              label: "Select a number or add another...",
            }}
            textInputProps={{
              selectionColor: "green",
              placeholderTextColor: "brown",
            }}
            touchableWrapperProps={{
              style: {
                ...styles.selectPicker,
                width: width,
              },
            }}
            style={{
              inputIOS: styles.inputIOS,
            }}
            onValueChange={onValueChange}
            items={items}
          />
        </SelectInputContainer>
        <If condition={!!endIcon}>
          <IconContainer>{endIcon}</IconContainer>
        </If>
      </SelectContainer>
      <If condition={!!error}>
        <ErrorContainer>
          <Icon
            style={{ color: color("SystemError2") }}
            name={"error"}
            type={IconTypeEnum.MaterialIcons}
          />
          <SelectError>{error}</SelectError>
        </ErrorContainer>
      </If>
    </SelectWrapper>
  );
};
export default Select;
