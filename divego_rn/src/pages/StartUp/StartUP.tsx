import React, { useState } from "react";
import { StatusBar, Switch, Text, useColorScheme } from "react-native";
import globalStyles from "@styles/global";
import Gap from "@components/Gap/Gap";
import { LoginContainer } from "@pages/Login/LoginStyledComponents";
import {
  FreediveScubaSwitchContainer,
  FreediveScubaSwitchText,
  UserRolesContainer,
  UserRolesContainerSubtitle,
  UserRolesContainerTitle,
} from "./StartUpStyledComponents";
import useGetRoleButtons from "./hooks/useGetRoleButtons";
import { color } from "@styles/colors";

const StartUp: React.FunctionComponent = () => {
  const [isScuba, setIsScuba] = useState(false);
  const toggleSwitch = () => setIsScuba((previousState) => !previousState);
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const getRoleButtons = useGetRoleButtons();

  return (
    <LoginContainer>
      <FreediveScubaSwitchContainer>
        <Switch
          trackColor={{
            false: color("SystemGrey1"),
            true: color("SystemGrey1"),
          }}
          thumbColor={
            isScuba ? color("SystemScubaDiver") : color("SystemBlue2")
          }
          ios_backgroundColor={color("SystemGrey1")}
          onValueChange={toggleSwitch}
          value={isScuba}
        />
        <FreediveScubaSwitchText>
          {isScuba ? "Scuba" : "Freedive"}
        </FreediveScubaSwitchText>
      </FreediveScubaSwitchContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <UserRolesContainerTitle>{"Choose your role"}</UserRolesContainerTitle>
      <Gap level={2} />
      <UserRolesContainer>{getRoleButtons(isScuba)}</UserRolesContainer>
      <Gap level={2} />
      <UserRolesContainerSubtitle>
        {"*Changing later may require further verification."}
      </UserRolesContainerSubtitle>
    </LoginContainer>
  );
};

export default StartUp;
