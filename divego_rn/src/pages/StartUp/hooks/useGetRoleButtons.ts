import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { RoleData, RoleDetails } from "@interfaces/CustomTypes";
import { ColorKey, color } from "@styles/colors";
import useRenderRoleButton from "./useRenderRoleButton";

const useGetRoleButtons = (): ((scuba: boolean) => JSX.Element[]) => {
  const roleDetails: RoleDetails[] = [
    {
      roleId: "diver",
      title: "Diver",
      confirmMessage:
        "Are you ready to find dive buddies to train and explore with?",
    },
    {
      roleId: "instructor",
      title: "Instructor",
      confirmMessage:
        "Are you a certified instructor ready to offer classes and training sessions? Verification required.",
    },
    {
      roleId: "shop",
      title: "Dive Shop",
      confirmMessage:
        "Are you operating a dive shop with gear for sale or rental?",
    },
  ];

  const getRoleRenderData: (scuba: boolean) => RoleData[] = (scuba: boolean) =>
    roleDetails.map(({ roleId, title, confirmMessage }) => {
      let iconName;
      let buttonColor;

      switch (roleId) {
        case "diver":
          if (scuba) {
            iconName = "ScubaUserDiverIcon" as CustomSvgIconName;
            buttonColor = color("SystemScubaDiver") as ColorKey;
          } else {
            iconName = "UserDiverIcon" as CustomSvgIconName;
            buttonColor = color("SystemBlue2") as ColorKey;
          }
          break;
        case "instructor":
          if (scuba) {
            iconName = "ScubaTanksIcon" as CustomSvgIconName;
            buttonColor = color("SystemScubaInstructor") as ColorKey;
          } else {
            iconName = "BuoyIcon" as CustomSvgIconName;
            buttonColor = color("SystemPurple") as ColorKey;
          }
          break;
        case "shop":
          if (scuba) {
            iconName = "ScubaFinsIcon" as CustomSvgIconName;
            buttonColor = color("SystemScubaShop") as ColorKey;
          } else {
            iconName = "FinsIcon" as CustomSvgIconName;
            buttonColor = color("SystemTeal") as ColorKey;
          }
          break;
      }

      return {
        roleId,
        title,
        confirmMessage,
        iconName,
        buttonColor,
        onConfirm: () => alert(`Update user with "${roleId}" role`),
      };
    });

  return (scuba: boolean) =>
    getRoleRenderData(scuba).map((role) => useRenderRoleButton(role));
};

export default useGetRoleButtons;
