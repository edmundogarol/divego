import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StatusBar,
  Text,
  useColorScheme,
} from "react-native";
import DiveGoLogo from "@assets/divego_logo_v2.svg";
import globalStyles from "@styles/global";
import Input from "@components/Input/Input";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Style } from "@components/Icon/IconStyle";
import Gap from "@components/Gap/Gap.native";
import {
  SignUpButton,
  SignUpContainer,
  SignUpHeader,
  SignUpInputsContainer,
} from "./SignUpStyledComponents";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginLogoEntryAnimation from "@pages/Login/hooks/useLoginLogoEntryAnimation";
import { useCommonHeaderOptions } from "@navigation/hooks/useCommonHeaderOptions.native";

const SignUp: React.FunctionComponent = () => {
  const { updateLoading } = useLoginDispatch();
  const { loading } = useLoginState();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;
  useLoginLogoEntryAnimation(fadeAnimation, fallAnimation);

  return (
    <SignUpContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <Animated.View
        style={{
          opacity: fadeAnimation,
          transform: [{ translateY: fallAnimation }],
        }}>
        <DiveGoLogo width={100} height={100} />
      </Animated.View>
      <Gap level={1} />
      <SignUpHeader>{"Sign Up"}</SignUpHeader>
      <Gap level={1} />
      <SignUpInputsContainer>
        <Input
          label="First Name"
          placeholder="Enter first name"
          icon={
            <Icon
              name="user-o"
              type={IconTypeEnum.FontAwesome}
              style={Style.icon}
            />
          }
        />
        <Input
          label="Last Name"
          placeholder="Enter last name"
          icon={
            <Icon
              name="user-o"
              type={IconTypeEnum.FontAwesome}
              style={Style.icon}
            />
          }
        />
        <Input
          label="Email"
          placeholder="Enter email"
          icon={
            <Icon
              name="mail"
              type={IconTypeEnum.MaterialIcons}
              style={Style.icon}
            />
          }
        />
        <Input
          label="Password"
          placeholder="Enter password"
          icon={
            <Icon
              name="lock-outline"
              type={IconTypeEnum.MaterialCommunityIcons}
              style={Style.icon}
            />
          }
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          placeholder="Confirm password"
          icon={
            <Icon
              name="lock-outline"
              type={IconTypeEnum.MaterialCommunityIcons}
              style={Style.icon}
            />
          }
          secureTextEntry
        />
      </SignUpInputsContainer>
      <SignUpButton
        loading={loading}
        text={
          loading ? <ActivityIndicator size="small" color="white" /> : "Submit"
        }
        onPress={() => updateLoading(!loading)}
      />
    </SignUpContainer>
  );
};

export default SignUp;
