import React from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import { color } from "@styles/colors";
import { ScreenProps } from "@pages/StartUp/hooks/useRoleScreens";
import { CarouselContainer } from "./CarouselStyledComponents";

const { width } = Dimensions.get("screen");

export interface CarouselProps {
  activeIndex: number;
  updateIndex: (index: number) => void;
  screens: ScreenProps[];
}

const Carousel: React.FunctionComponent<CarouselProps> = ({
  activeIndex,
  updateIndex,
  screens,
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item: ScreenProps) => item.key, []);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  let flatListRef = React.useRef(null);
  const onViewRef = React.useRef(({ viewableItems }: any) => {
    updateIndex(viewableItems[0].index);
  });

  const gotoNextPage = () => {
    if (activeIndex + 1 < screens.length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
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
        <Component
          screenKey={item.key}
          gotoNextPage={gotoNextPage}
          gotoPrevPage={gotoPrevPage}
        />
      );
    },
    [width, activeIndex],
  );

  return (
    <CarouselContainer>
      <FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={screens}
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
        data={screens}
        scrollX={scrollX}
        containerStyle={{}}
        inActiveDotColor={color("SystemBlue3")}
        activeDotColor={color("SystemBlue3")}
      />
    </CarouselContainer>
  );
};

export default Carousel;
