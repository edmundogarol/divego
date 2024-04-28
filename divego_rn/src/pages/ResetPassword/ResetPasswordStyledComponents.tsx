import styled from "styled-components/native";
import { CONTAINER_PADDING_DEFAULT } from "@styles/constants";
import Button from "@components/Button/Button";

export const ResetPasswordContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ResetPasswordInputsContainer = styled.View`
  width: 250px;
  padding: ${CONTAINER_PADDING_DEFAULT}px 0 ${CONTAINER_PADDING_DEFAULT}px 0;
  justify-content: space-between;
`;

export const ResetPasswordHeader = styled.Text`
  width: 250px;
  font-size: 30px;
  font-weight: 100;
`;
