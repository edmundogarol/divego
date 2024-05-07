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
import Gap from "@components/Gap/Gap";
import {
  ResetPasswordContainer,
  ResetPasswordHeader,
  ResetPasswordInputsContainer,
} from "./ResetPasswordStyledComponents";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginLogoEntryAnimation from "@pages/Login/hooks/useLoginLogoEntryAnimation";
import Button from "@components/Button/Button";
import useCheckResetPasswordFormErrors from "./hooks/useCheckResetPasswordFormErrors";
import useResetPasswordHandler from "./hooks/useResetPasswordHandler";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { If } from "@components/If/If";
import FormSuccess from "@components/Error/FormSuccess/FormSuccess";
import FormError from "@components/Error/FormError/FormError";

const ResetPassword: React.FunctionComponent = () => {
  const { resetPasswordForm, resetPasswordFormErrors, resetPasswordFormSent } =
    useLoginState();
  const { updateResetPasswordForm } = useLoginDispatch();
  const { resetPassword, loading } = useResetPasswordHandler();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;
  const renderInputIcon = useRenderInputIcon();

  useCheckResetPasswordFormErrors();
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
        <If condition={!resetPasswordFormSent}>
          <Input
            label="Email"
            placeholder="Enter email"
            value={resetPasswordForm.email}
            error={resetPasswordFormErrors.email}
            onChange={(e) => {
              updateResetPasswordForm({ email: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "mail",
              IconTypeEnum.MaterialIcons,
              resetPasswordFormErrors.email,
            )}
          />
        </If>
        <FormError
          error={
            resetPasswordFormErrors["error"] ||
            resetPasswordFormErrors["detail"]
          }
        />
        <If condition={resetPasswordFormSent}>
          <FormSuccess
            detail={
              "We've sent you an email with password reset instructions if there's an account with your email. Check your inbox and spam folder if you don't receive it soon."
            }
          />
        </If>
      </ResetPasswordInputsContainer>
      <If condition={!resetPasswordFormSent}>
        <Button
          loading={loading}
          text={
            loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Send Reset Link"
            )
          }
          onPress={() => resetPassword()}
        />
      </If>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
