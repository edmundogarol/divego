import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { NominateAmenitiesButtonIcon } from "../NominateDiveSite/NominateDiveSiteStyledComponents";

const useRenderAmenityIcon = () => {
  return ({ type, active }: { type: string; active: boolean }) => {
    switch (type) {
      case "toilet":
        return (
          <NominateAmenitiesButtonIcon
            active={active}
            name="toilet"
            type={IconTypeEnum.MaterialCommunityIcons}
          />
        );
      case "showers":
        return (
          <NominateAmenitiesButtonIcon
            active={active}
            name="shower"
            type={IconTypeEnum.FontAwesome}
          />
        );
      case "food":
        return (
          <NominateAmenitiesButtonIcon
            active={active}
            name="food"
            type={IconTypeEnum.MaterialCommunityIcons}
          />
        );
      case "gym":
        return (
          <NominateAmenitiesButtonIcon
            active={active}
            name="barbell"
            type={IconTypeEnum.Ionicons}
          />
        );
      default:
        return (
          <NominateAmenitiesButtonIcon
            active={active}
            name="question"
            type={IconTypeEnum.FontAwesome5}
          />
        );
    }
  };
};

export default useRenderAmenityIcon;
