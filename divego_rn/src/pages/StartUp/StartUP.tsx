import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import globalStyles from "@styles/global";
import Gap from "@components/Gap/Gap";
import { LoginContainer } from "@pages/Login/LoginStyledComponents";
import {
  UserRolesContainer,
  UserRolesContainerSubtitle,
  UserRolesContainerTitle,
} from "./StartUpStyledComponents";
import useGetRoleButtons from "./hooks/useGetRoleButtons";

const StartUp: React.FunctionComponent = () => {
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const getRoleButtons = useGetRoleButtons();

  return (
    <LoginContainer>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={styles.container.backgroundColor}
      />
      <UserRolesContainerTitle>{"Choose your role"}</UserRolesContainerTitle>
      <Gap level={2} />
      <UserRolesContainer>{getRoleButtons()}</UserRolesContainer>
      <Gap level={2} />
      <UserRolesContainerSubtitle>
        {"*Changing later may require further verification."}
      </UserRolesContainerSubtitle>
    </LoginContainer>
  );
};

export default StartUp;
