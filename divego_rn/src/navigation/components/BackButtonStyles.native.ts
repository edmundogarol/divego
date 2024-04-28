import { color } from "@styles/colors";
import { Platform, StyleSheet } from "react-native";

export const Style = StyleSheet.create({
  textStyle: {
    fontWeight: "normal",
    color: color("SystemBlue1"),
  },
  iconStyle: {
    fontSize: Platform.OS === "ios" ? 30 : 20,
    color: color("SystemBlue1"),
  },
});
