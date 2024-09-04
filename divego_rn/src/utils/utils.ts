import { css } from "styled-components";
import { LONG_LAT_DELTA } from "./constants";

export const isNotEmptyString = (value: string): boolean => {
  return typeof value === "string" && !!value && value !== "";
};

export const debugBorder = (color: string) => {
  return css`
    border-color: ${color};
    border-width: 2px;
  `;
};

export const debugStylesBorder = (color: string) => {
  return {
    borderColor: color,
    borderWidth: 1,
  };
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

export const mapZoom = (zoomLevel: number) => {
  return LONG_LAT_DELTA * zoomLevel;
};
