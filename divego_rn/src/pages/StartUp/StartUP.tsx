import React from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import StartUp1ChooseRole from "./screens/StartUp1ChooseRole";
import { StartUpContainer } from "./StartUpStyledComponents";
import { color } from "@styles/colors";

interface ScreenProps {
  key: string;
  title: string;
  component: JSX.Element;
}

const startUpScreens = [
  {
    key: "1",
    title: "Choose Role",
    component: <StartUp1ChooseRole />,
  },
];

const { width } = Dimensions.get("screen");

const StartUp: React.FunctionComponent = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item: ScreenProps) => item.key, []);

  const renderItem = React.useCallback(
    ({ item }: { item: ScreenProps }) => {
      return item.component;
    },
    [width],
  );

  return (
    <StartUpContainer>
      <FlatList
        data={startUpScreens}
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
        decelerationRate={"normal"}
        scrollEventThrottle={16}
        renderItem={renderItem}
        contentContainerStyle={{ overflow: "visible" }}
      />
      <ScalingDot
        data={startUpScreens}
        scrollX={scrollX}
        containerStyle={{}}
        inActiveDotColor={color("SystemBlue3")}
        activeDotColor={color("SystemBlue3")}
      />
    </StartUpContainer>
  );
};

export default StartUp;
