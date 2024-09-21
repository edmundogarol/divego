import { useCallback } from "react";
import {
  DirectoryAmenitiesContainer,
  DirectoryItemContainer,
  DirectoryItemHeader,
  DirectoryItemImage,
  DirectoryItemText,
} from "../DirectoryStyledComponents";
import useRenderAmenityIconsList from "./useRenderAmenityIconsList";
import { LocationsNearby } from "@interfaces/CustomTypes";
import useDirectoryState from "./useDirectoryState";
import useDirectoryDispatch from "./useDirectoryDispatch";

const useRenderDirectoryItem = () => {
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
          </DirectoryItemImage>
        </DirectoryItemContainer>
      );
    },
    [nearbyLocations],
  );
};

export default useRenderDirectoryItem;
