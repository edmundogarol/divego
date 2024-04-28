import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StatusBar,
  useColorScheme,
} from "react-native";
import DiveGoLogo from "@assets/divego_logo_v2.svg";
import globalStyles from "@styles/global";
import Input from "@components/Input/Input";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Style } from "@components/Icon/IconStyle";
import useLoginDispatch from "./hooks/useLoginDispatch";
import useLoginState from "./hooks/useLoginState";
import useLoginLogoEntryAnimation from "./hooks/useLoginLogoEntryAnimation";
import {
  ForgotPasswordLink,
  LoginButton,
  LoginContainer,
  LoginHeader,
  LoginInputsContainer,
  SignUpLink,
  SignUpText,
  SignUpTextContainer,
} from "./LoginStyledComponents";
import useLoginCheck from "./hooks/useLoginCheck";
import Gap from "@components/Gap/Gap.native";
import { PageEnum } from "@interfaces/NavigationTypes";
import { linkToUrl } from "@navigation/hooks/link";
import { color } from "@styles/colors";
import useLogin from "./hooks/useLogin";
import useCheckLoginFormErrors from "./hooks/useCheckLoginFormErrors";
import FormError from "@components/Error/FormError/FormError";

const Login: React.FunctionComponent = () => {
  const { updateLoginForm } = useLoginDispatch();
  const { loading, loginForm, loginFormErrors } = useLoginState();
  const login = useLogin();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;

  useLoginLogoEntryAnimation(fadeAnimation, fallAnimation);
  useLoginCheck();
  useCheckLoginFormErrors();

  return (
    <LoginContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <Animated.View
        style={{
          opacity: fadeAnimation,
          transform: [{ translateY: fallAnimation }],
        }}>
        <DiveGoLogo width={200} height={200} />
      </Animated.View>
      <LoginHeader>{"Welcome!"}</LoginHeader>
      <Gap level={1} />
      <LoginInputsContainer>
        <Input
          value={loginForm.email}
          error={loginFormErrors.email}
          label="Email / Username"
          placeholder="Enter email or username"
          onChange={(e) => {
            updateLoginForm({ email: e.nativeEvent.text });
          }}
          icon={
            <Icon
              name="user-o"
              type={IconTypeEnum.FontAwesome}
              style={{
                ...Style.icon,
                ...{
                  color: !!loginFormErrors.email
                    ? color("SystemError2")
                    : color("SystemLabel1"),
                },
              }}
            />
          }
        />
        <Input
          value={loginForm.password}
          error={loginFormErrors.password}
          label="Password"
          placeholder="Enter password"
          onChange={(e) => {
            updateLoginForm({ ...loginForm, password: e.nativeEvent.text });
          }}
          icon={
            <Icon
              name="lock-outline"
              type={IconTypeEnum.MaterialCommunityIcons}
              style={{
                ...Style.icon,
                ...{
                  color: !!loginFormErrors.password
                    ? color("SystemError2")
                    : color("SystemLabel1"),
                },
              }}
            />
          }
          secureTextEntry
        />
        <FormError error={loginFormErrors.detail} />
        <ForgotPasswordLink to={linkToUrl(PageEnum.ResetPassword)}>
          {"Forgot Password?"}
        </ForgotPasswordLink>
        <Gap level={1} />
      </LoginInputsContainer>
      <LoginButton
        loading={loading}
        text={
          loading ? <ActivityIndicator size="small" color="white" /> : "Login"
        }
        onPress={() => login()}
      />
      <SignUpTextContainer>
        <SignUpText>{"Don't have an Account?"}</SignUpText>
        <SignUpLink to={linkToUrl(PageEnum.SignUp)}>{"Sign Up"}</SignUpLink>
      </SignUpTextContainer>
    </LoginContainer>
  );
};

export default Login;
