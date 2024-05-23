import styled, { css } from "styled-components/native";
import {
  CONTAINER_MARGIN_DEFAULT,
  CONTAINER_MARGIN_SMALL,
  CONTAINER_PADDING_DEFAULT,
  CONTAINER_PADDING_SMALL,
  INPUT_SIZE,
  LABEL_SIZE,
  TEXT_SIZE,
} from "@styles/constants";
import { color } from "@styles/colors";

export const InputContainer = styled.View<{ error?: boolean }>`
  width: 100%;
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

export const InputStyled = styled.TextInput`
  flex: 1;
  height: 40px;
  font-size: ${TEXT_SIZE}px;
  padding-left: ${CONTAINER_PADDING_SMALL}px;
  padding-right: ${CONTAINER_PADDING_DEFAULT}px;
`;

export const Label = styled.Text<{ error?: boolean }>`
  color: ${({ error }) =>
    error ? color("SystemError2") : color("SystemLabel1")};
  font-size: ${LABEL_SIZE}px;
  margin-left: ${CONTAINER_MARGIN_SMALL}px;
  margin-bottom: ${CONTAINER_MARGIN_SMALL}px;
`;

export const InputError = styled.Text`
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
