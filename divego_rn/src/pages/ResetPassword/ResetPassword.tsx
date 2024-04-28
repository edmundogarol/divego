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
  ResetPasswordContainer,
  ResetPasswordHeader,
  ResetPasswordInputsContainer,
} from "./ResetPasswordStyledComponents";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginLogoEntryAnimation from "@pages/Login/hooks/useLoginLogoEntryAnimation";
import { useCommonHeaderOptions } from "@navigation/hooks/useCommonHeaderOptions.native";
import Button from "@components/Button/Button";

const ResetPassword: React.FunctionComponent = () => {
  const { updateLoading } = useLoginDispatch();
  const { loading } = useLoginState();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;
  useLoginLogoEntryAnimation(fadeAnimation, fallAnimation);

  return (
    <ResetPasswordContainer>
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
      <ResetPasswordHeader>{"Reset Password"}</ResetPasswordHeader>
      <Gap level={1} />
      <ResetPasswordInputsContainer>
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
      </ResetPasswordInputsContainer>
      <Button
        loading={loading}
        text={
          loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Send Reset Link"
          )
        }
        onPress={() => updateLoading(!loading)}
      />
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
