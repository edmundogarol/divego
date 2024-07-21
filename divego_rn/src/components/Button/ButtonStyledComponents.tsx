import { color } from "@styles/colors";
import { BUTTON_SIZE, CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components/native";

export const PressableWrapper = styled.Pressable<{
  loading?: boolean;
  transparent?: boolean;
  disabledBlock?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ loading, transparent, disabledBlock }) => {
    if (loading) {
      return "#c1d5e7";
    }
    if (disabledBlock) {
      return color("SystemLabel1");
    }
    if (transparent) {
      return "transparent";
    }
    return color("SystemBlue3");
  }};
  padding: ${CONTAINER_PADDING_DEFAULT}px;
  width: 100%;
  height: ${BUTTON_SIZE}px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 17px;
  color: white;
`;
