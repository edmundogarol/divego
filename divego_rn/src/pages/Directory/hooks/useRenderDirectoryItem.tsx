import { useCallback } from "react";
import {
  DirectoryAmenitiesContainer,
  DirectoryItemAddButton,
  DirectoryItemAddIcon,
  DirectoryItemContainer,
  DirectoryItemHeader,
  DirectoryItemImage,
  DirectoryItemText,
} from "../DirectoryStyledComponents";
import useRenderAmenityIconsList from "./useRenderAmenityIconsList";
import useDirectoryState from "./useDirectoryState";
import useDirectoryDispatch from "./useDirectoryDispatch";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";

const useRenderDirectoryItem = (
  preferredDiveSites: number[],
  updatePreferredDiveSites: (diveSites: number[]) => void,
) => {
  const { nearbyLocations } = useDirectoryState();
  const { updateNearbyLocations } = useDirectoryDispatch();

  return useCallback(
    ({ item }: { item: any }) => {
      const renderAmenityIconsList = useRenderAmenityIconsList();

      return (
        <DirectoryItemContainer
          active={item.active}
          onPress={() =>
            updateNearbyLocations({
              ...nearbyLocations,
              [item.id]: { ...item, active: !item.active },
            })
          }>
          <DirectoryItemImage active={item.active} source={item.mapPhoto}>
            <DirectoryItemHeader>
              <DirectoryItemText>{item.description}</DirectoryItemText>
              <DirectoryAmenitiesContainer>
                {renderAmenityIconsList(item)}
              </DirectoryAmenitiesContainer>
            </DirectoryItemHeader>
            <DirectoryItemAddButton
              onPress={() => {
                updatePreferredDiveSites([...preferredDiveSites, item.id]);
                updateNearbyLocations({
                  ...nearbyLocations,
                  [item.id]: { ...item, active: !item.active },
                });
              }}>
              <DirectoryItemAddIcon
                type={IconTypeEnum.FontAwesome}
                name="plus"
              />
            </DirectoryItemAddButton>
          </DirectoryItemImage>
        </DirectoryItemContainer>
      );
    },
    [nearbyLocations, preferredDiveSites, updatePreferredDiveSites],
  );
};

export default useRenderDirectoryItem;
