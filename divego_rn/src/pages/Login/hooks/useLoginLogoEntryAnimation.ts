import { useEffect } from "react";
import { Animated } from "react-native";

const useLoginLogoEntryAnimation = (
  fadeAnimation: Animated.Value,
  fallAnimation: Animated.Value,
) => {
  Animated.timing(fadeAnimation, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();

  Animated.timing(fallAnimation, {
    toValue: 0,
    duration: 1500,
    useNativeDriver: true,
  }).start();
};

export default useLoginLogoEntryAnimation;
