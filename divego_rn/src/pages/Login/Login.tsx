import React from "react";
import { ActivityIndicator, StatusBar, useColorScheme } from "react-native";
import DivegoLogo from "@assets/divego_logo_v2.svg";
import {
  LoginContainer,
  LoginHeader,
  LoginInputsContainer,
} from "./LoginStyledComponents";
import globalStyles from "@styles/global";
import Input from "@components/Input/Input";
import Button from "@components/Button/Button";
import useLoginDispatch from "./hooks/useLoginDispatch";
import useLoginState from "./hooks/useLoginState";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Style } from "@components/Icon/IconStyle";

const Login: React.FunctionComponent = () => {
  const { updateLoading } = useLoginDispatch();
  const { loading } = useLoginState();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <LoginContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <DivegoLogo width={200} height={200} />
      <LoginHeader>Welcome!</LoginHeader>
      <LoginInputsContainer>
        <Input
          label="Email / Username"
          placeholder="Type email or username"
          icon={
            <Icon name="user" type={IconTypeEnum.Ionicons} style={Style.icon} />
          }
        />
        <Input
          label="Password"
          placeholder="Type password"
          icon={
            <Icon
              name="lock-outline"
              type={IconTypeEnum.MaterialCommunityIcons}
              style={Style.icon}
            />
          }
          secureTextEntry
        />
      </LoginInputsContainer>
      <Button
        text={
          loading ? <ActivityIndicator size="small" color="white" /> : "Login"
        }
        onPress={() => updateLoading(!loading)}
      />
    </LoginContainer>
  );
};

export default Login;
