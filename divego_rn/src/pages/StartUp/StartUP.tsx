import React, { useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { StartUpContainer } from "./StartUpStyledComponents";
import { color } from "@styles/colors";
import useRoleScreens, { ScreenProps } from "./hooks/useRoleScreens";
import { If } from "@components/If/If";
import useStartUpState from "./hooks/useStartUpState";
import useStartUpDispatch from "./hooks/useStartUpDispatch";

const { width } = Dimensions.get("screen");

const StartUp: React.FunctionComponent = () => {
  const { active_index, screens_group } = useStartUpState();
  const { updateStartUpActiveIndex } = useStartUpDispatch();
  const roleScreens = useRoleScreens();
  const startUpScreens = roleScreens();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item: ScreenProps) => item.key, []);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  let flatListRef = React.useRef(null);
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    updateStartUpActiveIndex(viewableItems[0].index);
  });

  const gotoNextPage = () => {
    console.log({ gotoNextPage: active_index });
    if (active_index + 1 < startUpScreens[screens_group].length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: active_index + 1,
        animated: true,
      });
    }
  };

  const gotoPrevPage = () => {
    if (active_index !== 0) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: active_index - 1,
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
    [width, active_index],
  );

  return (
    <StartUpContainer>
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={startUpScreens[screens_group]}
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
      <If condition={active_index !== 0}>
        <ScalingDot
          data={startUpScreens[screens_group]}
          scrollX={scrollX}
          containerStyle={{}}
          inActiveDotColor={color("SystemBlue3")}
          activeDotColor={color("SystemBlue3")}
        />
      </If>
    </StartUpContainer>
  );
};

export default StartUp;
