import styled, { css } from "styled-components/native";

export const Loading = styled.ActivityIndicator<{ scale?: number }>`
  height: 100%;
  ${({ scale }) => {
    if (scale) {
      return css`
        transform: scale(${scale});
      `;
    }
  }}
`;
