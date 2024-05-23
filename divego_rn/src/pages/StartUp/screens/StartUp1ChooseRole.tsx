import React, { useState } from "react";
import {
  Alert,
  StatusBar,
  Dimensions,
  Switch,
  useColorScheme,
} from "react-native";
import globalStyles from "@styles/global";
import Gap from "@components/Gap/Gap";
import {
  FreediveScubaSwitchContainer,
  FreediveScubaSwitchText,
  ScreenContentsContainer,
  UserRolesContainer,
  UserRolesContainerSubtitle,
  UserRolesContainerTitle,
} from "../StartUpStyledComponents";
import { color } from "@styles/colors";
import { delay } from "@utils/utils";
import useGetRoleButtons from "../hooks/useGetRoleButtons";

const { width } = Dimensions.get("screen");

const StartUp1ChooseRole: React.FunctionComponent = () => {
  const [isScuba, setIsScuba] = useState(false);
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const getRoleButtons = useGetRoleButtons();

  const toggleSwitch = async () => {
    setIsScuba((previousState) => !previousState);
    if (!isScuba) {
      await delay(1000);
      Alert.alert(
        `Coming Soon`,
        " This feature is currently under development and will be available in future updates. Stay tuned for exciting new additions!",
        [
          {
            text: "Ok",
          },
        ],
      );
      await delay(1000);
      setIsScuba(false);
    }
  };

  return (
    <ScreenContentsContainer width={width}>
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
        {"*Changing this later may require further verification."}
      </UserRolesContainerSubtitle>
    </ScreenContentsContainer>
  );
};

export default StartUp1ChooseRole;
