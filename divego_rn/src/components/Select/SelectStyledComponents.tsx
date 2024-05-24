import styled, { css } from "styled-components/native";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  INPUT_SIZE,
  LABEL_SIZE,
  LABEL_SIZE_LARGE,
} from "@styles/constants";
import { color } from "@styles/colors";

export const SelectWrapper = styled.View`
  width: 100%;
`;

export const SelectContainer = styled.View<{ error?: boolean }>`
  align-items: center;
  height: ${INPUT_SIZE}px;
  background-color: white;
  border-bottom-width: 0.5px;
  border-color: #aaaaaa;
  flex-direction: row;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
  ${({ error }): any => {
    if (error) {
      return css`
        border-color: ${color("SystemError2")};
        border-width: 1px;
      `;
    }
  }}
`;

export const Label = styled.Text<{ error?: boolean }>`
  color: ${({ error }) =>
    error ? color("SystemError2") : color("SystemLabel1")};
  font-size: ${LABEL_SIZE_LARGE}px;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
`;

export const SelectError = styled.Text`
  color: ${color("SystemError2")};
  font-size: ${LABEL_SIZE}px;
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
  width: 90%;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${CONTAINER_MARGIN_DEFAULT}px;
  width: auto;
`;

export const IconContainer = styled.View`
  width: 9%;
`;

export const SelectInputContainer = styled.View`
  width: 80%;
`;
