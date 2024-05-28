import { CustomSvgIconName } from "@components/Icon/libraries/CustomSvgIcon";
import { RoleData, RoleDetails } from "@interfaces/CustomTypes";
import { ColorKey, color } from "@styles/colors";
import useRenderRoleButton from "./useRenderRoleButton";
import useStartUpDispatch from "./useStartUpDispatch";
import { StartUpScreensGroup } from "../StartUpInterfaces";

const useGetRoleButtons = (
  onConfirm: () => void,
): ((scuba: boolean) => JSX.Element[]) => {
  const { updateStartUpScreensGroup } = useStartUpDispatch();
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
      let screenSet: StartUpScreensGroup;

      switch (roleId) {
        case "diver":
          if (scuba) {
            iconName = "ScubaUserDiverIcon" as CustomSvgIconName;
            buttonColor = color("SystemScubaDiver") as ColorKey;
            screenSet = StartUpScreensGroup.ScubaDiver;
          } else {
            iconName = "UserDiverIcon" as CustomSvgIconName;
            buttonColor = color("SystemBlue2") as ColorKey;
            screenSet = StartUpScreensGroup.Freediver;
          }
          break;
        case "instructor":
          if (scuba) {
            iconName = "ScubaTanksIcon" as CustomSvgIconName;
            buttonColor = color("SystemScubaInstructor") as ColorKey;
            screenSet = StartUpScreensGroup.ScubaInstructor;
          } else {
            iconName = "BuoyIcon" as CustomSvgIconName;
            buttonColor = color("SystemPurple") as ColorKey;
            screenSet = StartUpScreensGroup.FreediveInstructor;
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
          screenSet = StartUpScreensGroup.Shop;
          break;
      }

      return {
        type: scuba ? "scuba" : "freediver",
        roleId,
        title,
        confirmMessage,
        iconName,
        buttonColor,
        onConfirm: () => {
          updateStartUpScreensGroup(screenSet);
          onConfirm();
        },
      };
    });

  return (scuba: boolean) =>
    getRoleRenderData(scuba).map((role) => useRenderRoleButton(role));
};

export default useGetRoleButtons;
