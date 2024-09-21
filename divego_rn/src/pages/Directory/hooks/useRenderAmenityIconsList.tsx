import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { color } from "@styles/colors";
import { DirectoryAmenitiesIconContainer } from "../DirectoryStyledComponents";
import { LocationsNearby } from "@interfaces/CustomTypes";

const useRenderAmenityIconsList = () => {
  return (item: LocationsNearby) =>
    !!item &&
    item.amenities?.map((amenity: string, idx: number) => {
      switch (amenity) {
        case "toilet":
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="toilet"
              type={IconTypeEnum.MaterialCommunityIcons}
            />
          );
        case "showers":
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="shower"
              type={IconTypeEnum.FontAwesome}
            />
          );
        case "food":
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="food"
              type={IconTypeEnum.MaterialCommunityIcons}
            />
          );
        case "gym":
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="barbell"
              type={IconTypeEnum.Ionicons}
            />
          );
        case "fee":
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="dollar"
              type={IconTypeEnum.FontAwesome}
            />
          );
        default:
          return (
            <DirectoryAmenitiesIconContainer
              key={idx}
              color={color("SystemWhite")}
              name="question"
              type={IconTypeEnum.FontAwesome5}
            />
          );
      }
    });
};

export default useRenderAmenityIconsList;
