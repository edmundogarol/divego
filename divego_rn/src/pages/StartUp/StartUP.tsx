import React, { useRef } from "react";
import { Animated, StatusBar, useColorScheme } from "react-native";
import DiveGoLogo from "@assets/divego_logo_v2.svg";
import globalStyles from "@styles/global";
import Gap from "@components/Gap/Gap";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginLogoEntryAnimation from "@pages/Login/hooks/useLoginLogoEntryAnimation";
import {
  LoginContainer,
  LoginHeader,
} from "@pages/Login/LoginStyledComponents";

const StartUP: React.FunctionComponent = () => {
  const { user } = useLoginState();
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const fallAnimation = useRef(new Animated.Value(-30)).current;

  useLoginLogoEntryAnimation(fadeAnimation, fallAnimation);

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
        {`Welcome ${
          user.first_name || user.last_name || user.username || user.email
        }!`}
      </LoginHeader>
      <Gap level={1} />
    </LoginContainer>
  );
};

export default StartUP;
