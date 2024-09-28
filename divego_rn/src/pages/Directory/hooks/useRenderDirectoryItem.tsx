import { useCallback, useEffect, useRef, useState } from "react";
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
import { Animated } from "react-native";

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
        <Animated.View
          style={[
            {
              opacity: item.animatedVal,
            },
          ]}>
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
                  updateNearbyLocations({
                    ...nearbyLocations,
                    [item.id]: { ...item, animating: true },
                  });

                  Animated.timing(item.animatedVal, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                  }).start(({ finished }) => {
                    if (finished && item && item.id) {
                      updatePreferredDiveSites([
                        ...preferredDiveSites,
                        item.id,
                      ]);
                      updateNearbyLocations({
                        ...nearbyLocations,
                        [item.id]: {
                          ...item,
                          active: false,
                          animating: false,
                        },
                      });
                    }
                  });
                }}>
                <DirectoryItemAddIcon
                  type={IconTypeEnum.FontAwesome}
                  name="plus"
                />
              </DirectoryItemAddButton>
            </DirectoryItemImage>
          </DirectoryItemContainer>
        </Animated.View>
      );
    },
    [nearbyLocations, preferredDiveSites, updatePreferredDiveSites],
  );
};

export default useRenderDirectoryItem;
