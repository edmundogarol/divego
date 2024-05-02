import { css } from "styled-components";

export const isNotEmptyString = (value: string): boolean => {
  return typeof value === "string" && !!value && value !== "";
};

export const debugBorder = (color: string) => {
  return css`
    border-color: ${color};
    border-width: 1px;
  `;
};
