import { useCallback } from "react";
import {
  DirectoryAmenitiesContainer,
  DirectoryItemContainer,
  DirectoryItemHeader,
  DirectoryItemImage,
  DirectoryItemText,
} from "../DirectoryStyledComponents";
import useRenderAmenityIcons from "./useRenderAmenityIcons";

const useRenderDirectoryItem = () =>
  useCallback(({ item }: any) => {
    const renderAmenityIcons = useRenderAmenityIcons();

    return (
      <DirectoryItemContainer>
        <DirectoryItemImage source={item.img}>
          <DirectoryItemHeader>
            <DirectoryItemText>{item.description}</DirectoryItemText>
            <DirectoryAmenitiesContainer>
              {renderAmenityIcons(item)}
            </DirectoryAmenitiesContainer>
          </DirectoryItemHeader>
        </DirectoryItemImage>
      </DirectoryItemContainer>
    );
  }, []);

export default useRenderDirectoryItem;
