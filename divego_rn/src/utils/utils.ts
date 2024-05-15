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

export const isJson = (item: any) => {
  let value = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return typeof value === "object" && value !== null;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
