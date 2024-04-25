import styled from "styled-components/native";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_PADDING_DEFAULT,
} from "@styles/constants";

export const LoginContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const LoginInputsContainer = styled.View`
  width: 250px;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const LoginHeader = styled.Text`
  width: 250px;
  font-size: 30px;
  font-weight: 100;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
`;
