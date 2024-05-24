import React, { useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { StartUpContainer } from "./StartUpStyledComponents";
import { color } from "@styles/colors";
import useRoleScreens, { ScreenProps } from "./hooks/useRoleScreens";

const { width } = Dimensions.get("screen");

let activeIndex = 0;

const StartUp: React.FunctionComponent = () => {
  const [screensGroup, changeScreensGroup] = useState("freediver");
  const startUpScreens = useRoleScreens();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item: ScreenProps) => item.key, []);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  let flatListRef = React.useRef(null);
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    activeIndex = viewableItems[0].index;
  });

  const gotoNextPage = (screen: string) => {
    if (activeIndex + 1 < startUpScreens[screensGroup].length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      changeScreensGroup(screen);
    }
  };

  const gotoPrevPage = () => {
    if (activeIndex !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  const renderItem = React.useCallback(
    ({ item }: { item: ScreenProps }) => {
      const Component = item.component;
      return (
        <Component gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
      );
    },
    [width],
  );

  return (
    <StartUpContainer>
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={startUpScreens[screensGroup]}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        pagingEnabled
        horizontal
        scrollEnabled={false}
        decelerationRate={"normal"}
        scrollEventThrottle={16}
        renderItem={renderItem}
        contentContainerStyle={{}}
      />
      <ScalingDot
        data={startUpScreens[screensGroup]}
        scrollX={scrollX}
        containerStyle={{}}
        inActiveDotColor={color("SystemBlue3")}
        activeDotColor={color("SystemBlue3")}
      />
    </StartUpContainer>
  );
};

export default StartUp;
