import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { RoleData, RoleDetails } from "@interfaces/CustomTypes";
import { ColorKey, color } from "@styles/colors";
import useRenderRoleButton from "./useRenderRoleButton";

const useGetRoleButtons = (): (() => JSX.Element[]) => {
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

  const getRoleRenderData: RoleData[] = roleDetails.map(
    ({ roleId, title, confirmMessage }) => {
      let iconName;
      let buttonColor;

      switch (roleId) {
        case "diver":
          iconName = "UserDiverIcon" as CustomSvgIconName;
          buttonColor = color("SystemBlue3") as ColorKey;
          break;
        case "instructor":
          iconName = "BuoyIcon" as CustomSvgIconName;
          buttonColor = color("SystemPurple") as ColorKey;
          break;
        case "shop":
          iconName = "FinsIcon" as CustomSvgIconName;
          buttonColor = color("SystemTeal") as ColorKey;
          break;
      }

      return {
        roleId,
        title,
        confirmMessage,
        iconName,
        buttonColor,
      };
    },
  );

  return () => getRoleRenderData.map((role) => useRenderRoleButton(role));
};

export default useGetRoleButtons;
