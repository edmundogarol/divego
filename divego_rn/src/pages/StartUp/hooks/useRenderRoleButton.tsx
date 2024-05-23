import { color } from "@styles/colors";
import {
  UserRoleButton,
  UserRoleButtonIcon,
  UserRoleButtonLabel,
  UserRoleButtonLabelContainer,
} from "../StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { RoleData } from "@interfaces/CustomTypes";
import { Alert } from "react-native";

const useRenderRoleButton = (roleData: RoleData): JSX.Element => {
  const confirmAlert = () =>
    Alert.alert(`Confirm Role '${roleData.title}'`, roleData.confirmMessage, [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: () => roleData.onConfirm(),
      },
    ]);

  return (
    <UserRoleButtonLabelContainer
      onPress={() => (roleData.type === "scuba" ? null : confirmAlert())}
      key={roleData.roleId}>
      <UserRoleButton color={roleData.buttonColor}>
        <UserRoleButtonIcon
          size={70}
          name={roleData.iconName || "question-mark"}
          color={color("SystemWhite")}
          type={IconTypeEnum.CustomSvgIcon}
        />
        <UserRoleButtonLabel>{roleData.title}</UserRoleButtonLabel>
      </UserRoleButton>
    </UserRoleButtonLabelContainer>
  );
};

export default useRenderRoleButton;
