import { StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { deviceHeight } from "./media";

const globalStyles = () => {
  const isDarkMode = useColorScheme() === "dark";

  return StyleSheet.create({
    container: {
      height: deviceHeight,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
  });
};

export default globalStyles;
