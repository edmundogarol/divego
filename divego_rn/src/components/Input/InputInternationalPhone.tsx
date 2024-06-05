import React from "react";
import {
  Label,
  InputContainer,
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
import PhoneInput, { ICountry } from "react-native-international-phone-number";

export interface InputWrapperProps extends TextInputProps {
  value?: string;
  country?: ICountry;
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  error?: string;
  subtext?: string;
  internationalNumbers?: boolean;
  onChangePhoneNumber: (text: string) => void;
  onChangeSelectedCountry: (country: ICountry) => void;
}

const InputInternationalPhone: React.FunctionComponent<InputWrapperProps> = ({
  value,
  country,
  label,
  disabled,
  icon,
  placeholder,
  error,
  subtext,
  internationalNumbers,
  onChangePhoneNumber,
  onChangeSelectedCountry,
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
        <PhoneInput
          phoneInputStyles={{
            container: {
              backgroundColor: color("SystemWhite"),
              borderWidth: 0,
            },
          }}
          value={value || ""}
          onChangePhoneNumber={onChangePhoneNumber}
          selectedCountry={country}
          onChangeSelectedCountry={onChangeSelectedCountry}
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
export default InputInternationalPhone;
