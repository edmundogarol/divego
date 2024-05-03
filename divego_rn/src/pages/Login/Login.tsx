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
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
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
import Gap from "@components/Gap/Gap";
import { PageEnum } from "@interfaces/NavigationTypes";
import { linkToUrl } from "@navigation/hooks/link";
import useLogin from "./hooks/useLogin";
import useCheckLoginFormErrors from "./hooks/useCheckLoginFormErrors";
import FormError from "@components/Error/FormError/FormError";
import useRenderInputIcon from "../../components/Input/hooks/useRenderInputIcon";
import { If } from "@components/If/If";

const Login: React.FunctionComponent = () => {
  const { user, loading, loginForm, loginFormErrors } = useLoginState();
  const { updateLoginForm, updateResetPasswordFormSent } = useLoginDispatch();
  const login = useLogin();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;
  const renderInputIcon = useRenderInputIcon();

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
      <LoginHeader>
        {!user?.logged_in
          ? "Login"
          : `Welcome ${
              user.first_name || user.last_name || user.username || user.email
            }!`}
      </LoginHeader>
      <Gap level={1} />
      <If condition={!user?.logged_in}>
        <LoginInputsContainer>
          <Input
            value={loginForm.email}
            error={loginFormErrors.email}
            label="Email / Username"
            placeholder="Enter email or username"
            onChange={(e) => {
              updateLoginForm({ email: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "user-o",
              IconTypeEnum.FontAwesome,
              loginFormErrors.email,
            )}
          />
          <Input
            value={loginForm.password}
            error={loginFormErrors.password}
            label="Password"
            placeholder="Enter password"
            onChange={(e) => {
              updateLoginForm({ ...loginForm, password: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "lock-outline",
              IconTypeEnum.MaterialCommunityIcons,
              loginFormErrors.password,
            )}
            secureTextEntry
          />
          <FormError error={loginFormErrors.detail} />
          <ForgotPasswordLink
            to={linkToUrl(PageEnum.ResetPassword)}
            onPress={() => {
              updateResetPasswordFormSent(false);
            }}>
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
      </If>
    </LoginContainer>
  );
};

export default Login;
