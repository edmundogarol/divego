import { color } from "@styles/colors";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import styled from "styled-components/native";

export const PressableWrapper = styled.Pressable<{ loading?: boolean }>`
  align-items: center;
  justify-content: center;
  background-color: ${({ loading }) => {
    return loading ? "#c1d5e7" : color("SystemBlue3");
  }};
  padding: ${CONTAINER_PADDING_DEFAULT}px;
  width: 250px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 17px;
  color: white;
`;
