import styled from "styled-components/native";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
} from "@styles/constants";
import { color } from "@styles/colors";

export const InputContainer = styled.View`
  background-color: white;
  border-bottom-width: 0.5px;
  border-color: grey;
  flex-direction: row;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const InputStyled = styled.TextInput`
  flex: 1;
  height: 40px;
  font-size: 17px;
  padding-left: ${CONTAINER_PADDING_DEFAULT}px;
  padding-right: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const Label = styled.Text`
  color: ${color("SystemLabel1")};
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
`;
