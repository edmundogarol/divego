import styled from "styled-components/native";
import {
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_LARGE,
} from "@styles/constants";

export const ResetPasswordContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: ${CONTAINER_PADDING_LARGE}px;
  padding-right: ${CONTAINER_PADDING_LARGE}px;
`;

export const ResetPasswordInputsContainer = styled.View`
  width: 100%;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const ResetPasswordHeader = styled.Text`
  font-size: 30px;
  font-weight: 100;
`;
