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
import { ScrollView, TextInputProps } from "react-native";
import { Else, If } from "@components/If/If";
import { color } from "@styles/colors";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import environmentConfig from "@utils/environmentConfig";

export interface InputWrapperProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  error?: string;
  subtext?: string;
  googleAutoComplete?: boolean;
  onGoogleAutoCompleteChange?: (
    data: { description: string; place_id: string },
    details: any,
  ) => void;
}

const Input: React.FunctionComponent<InputWrapperProps> = ({
  label,
  disabled,
  icon,
  placeholder,
  error,
  subtext,
  googleAutoComplete,
  onGoogleAutoCompleteChange,
  ...props
}) => {
  return (
    <InputWrapper>
      <If condition={!!label}>
        <Label disabled={disabled} error={!!error}>
          {label}
        </Label>
      </If>
      <InputContainer error={!!error} googleAutoComplete={googleAutoComplete}>
        <If condition={!!icon}>{icon}</If>
        <If condition={googleAutoComplete}>
          <ScrollView>
            <GooglePlacesAutocomplete
              placeholder="Search"
              nearbyPlacesAPI="GooglePlacesSearch"
              onFail={(error) => console.log(error)}
              onTimeout={() => console.log("timeout")}
              onPress={onGoogleAutoCompleteChange}
              query={{
                key: environmentConfig.GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
            />
          </ScrollView>
          <Else>
            <InputStyled
              {...props}
              disabled={disabled}
              placeholder={placeholder}
              placeholderTextColor={
                !!error ? color("SystemError2") : color("SystemLabel1")
              }
              editable={!disabled}
            />
          </Else>
        </If>
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
