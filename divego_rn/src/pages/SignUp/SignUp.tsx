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
  SignUpButton,
  SignUpContainer,
  SignUpHeader,
  SignUpHeaderContainer,
  SignUpInputsContainer,
  SignUpScrollView,
} from "./SignUpStyledComponents";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginLogoEntryAnimation from "@pages/Login/hooks/useLoginLogoEntryAnimation";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import useCheckSignUpFormErrors from "@pages/SignUp/hooks/useCheckSignUpFormErrors";
import useSignUpHandler from "@pages/SignUp/hooks/useSignUpHandler";
import FormError from "@components/Error/FormError/FormError";

const SignUp: React.FunctionComponent = () => {
  const { updateSignUpForm } = useLoginDispatch();
  const { signUpForm, signUpFormErrors } = useLoginState();
  const { signUp, loading } = useSignUpHandler();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;
  const renderInputIcon = useRenderInputIcon();

  useCheckSignUpFormErrors();
  useLoginLogoEntryAnimation(fadeAnimation, fallAnimation);

  return (
    <SignUpContainer>
      <SignUpScrollView>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={styles.container.backgroundColor}
        />
        <Gap level={3} />
        <SignUpHeaderContainer>
          <Animated.View
            style={{
              opacity: fadeAnimation,
              transform: [{ translateY: fallAnimation }],
            }}>
            <DiveGoLogo width={100} height={100} />
          </Animated.View>
          <Gap level={1} />
          <SignUpHeader>{"Sign Up"}</SignUpHeader>
        </SignUpHeaderContainer>
        <Gap level={1} />
        <SignUpInputsContainer>
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={signUpForm.first_name}
            error={signUpFormErrors.first_name}
            onChange={(e) => {
              updateSignUpForm({ first_name: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "user-o",
              IconTypeEnum.FontAwesome,
              signUpFormErrors.first_name,
            )}
          />
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={signUpForm.last_name}
            error={signUpFormErrors.last_name}
            onChange={(e) => {
              updateSignUpForm({ last_name: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "user-o",
              IconTypeEnum.FontAwesome,
              signUpFormErrors.last_name,
            )}
          />
          <Input
            label="Email"
            placeholder="Enter email"
            value={signUpForm.email}
            error={signUpFormErrors.email}
            onChange={(e) => {
              updateSignUpForm({ email: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "mail",
              IconTypeEnum.MaterialIcons,
              signUpFormErrors.email,
            )}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            value={signUpForm.password}
            error={signUpFormErrors.password}
            onChange={(e) => {
              updateSignUpForm({ password: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "lock-outline",
              IconTypeEnum.MaterialCommunityIcons,
              signUpFormErrors.password,
            )}
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            value={signUpForm.confirm_password}
            error={signUpFormErrors.confirm_password}
            onChange={(e) => {
              updateSignUpForm({ confirm_password: e.nativeEvent.text });
            }}
            icon={renderInputIcon(
              "lock-outline",
              IconTypeEnum.MaterialCommunityIcons,
              signUpFormErrors.confirm_password,
            )}
            secureTextEntry
          />
          <FormError
            error={signUpFormErrors["error"] || signUpFormErrors["detail"]}
          />
        </SignUpInputsContainer>
        <SignUpButton
          loading={loading}
          text={
            loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Submit"
            )
          }
          onPress={() => signUp()}
        />
      </SignUpScrollView>
    </SignUpContainer>
  );
};

export default SignUp;
