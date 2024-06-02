import { color } from "@styles/colors";
import {
  CONTAINER_PADDING_SMALL,
  INPUT_SIZE,
  TEXT_SIZE,
} from "@styles/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  placeholder: {
    fontSize: TEXT_SIZE,
  },
  selectPicker: {
    height: INPUT_SIZE,
    fontSize: TEXT_SIZE,
    justifyContent: "center",
  },
  inputIOS: {
    fontSize: TEXT_SIZE,
    color: color("SystemLabel2"),
  },
});
