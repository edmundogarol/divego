import styled, { css } from "styled-components/native";

export const GapContainer = styled.View<{
  isVertical: boolean;
  baseValue: number;
  level: number;
}>`
  ${({ isVertical, baseValue, level }): any => {
    if (isVertical) {
      return css`
        height: ${baseValue * level}px;
        width: 0;
      `;
    } else {
      return css`
        height: 0;
        width: ${baseValue * level}px;
      `;
    }
  }}
`;
