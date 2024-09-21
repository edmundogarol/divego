import { useCallback } from "react";
import {
  DirectoryAmenitiesContainer,
  DirectoryItemContainer,
  DirectoryItemHeader,
  DirectoryItemImage,
  DirectoryItemText,
} from "../DirectoryStyledComponents";
import useRenderAmenityIconsList from "./useRenderAmenityIconsList";

const useRenderDirectoryItem = () =>
  useCallback(({ item }: any) => {
    const renderAmenityIconsList = useRenderAmenityIconsList();

    return (
      <DirectoryItemContainer>
        <DirectoryItemImage source={item.img}>
          <DirectoryItemHeader>
            <DirectoryItemText>{item.description}</DirectoryItemText>
            <DirectoryAmenitiesContainer>
              {renderAmenityIconsList(item)}
            </DirectoryAmenitiesContainer>
          </DirectoryItemHeader>
        </DirectoryItemImage>
      </DirectoryItemContainer>
    );
  }, []);

export default useRenderDirectoryItem;
