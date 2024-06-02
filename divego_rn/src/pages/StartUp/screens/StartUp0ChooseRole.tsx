import React, { useState } from "react";
import { Alert, StatusBar, Switch, useColorScheme } from "react-native";
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
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useStartUpState from "../hooks/useStartUpState";

const StartUp0ChooseRole: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoNextPage }) => {
  const { active_index } = useStartUpState();
  const [isScuba, setIsScuba] = useState(false);
  const styles = globalStyles();
  const isDarkMode = useColorScheme() === "dark";
  const getRoleButtons = useGetRoleButtons(gotoNextPage);

  useCustomScreenOptions({
    title: "Choose Role",
    depList: [active_index],
    loadCondition: active_index === 0,
  });

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
    <ScreenContentsContainer>
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

export default StartUp0ChooseRole;
