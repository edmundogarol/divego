import styled from "styled-components/native";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";
import Button from "@components/Button/Button";
import { debugBorder } from "@utils/utils";

export const SignUpContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const SignUpScrollView = styled.ScrollView`
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
  width: 100%;
`;

export const SignUpInputsContainer = styled.View`
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const SignUpHeaderContainer = styled.View`
  display: flex;
  align-items: center;
`;

export const SignUpHeader = styled.Text`
  font-size: 30px;
  font-weight: 100;
`;

export const SignUpButton = styled(Button)``;
