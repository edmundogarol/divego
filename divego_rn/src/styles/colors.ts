export type ColorKey =
  | "SystemBlue1"
  | "SystemBlue2"
  | "SystemBlue3"
  | "SystemBlue4"
  | "SystemLabel1"
  | "SystemError1"
  | "SystemError2";

const colorsMap = {
  SystemBlue1: "#1a2241",
  SystemBlue2: "#2e4365",
  SystemBlue3: "#658fb5",
  SystemBlue4: "#b7d3e8",
  SystemLabel1: "#adadad",
  SystemError1: "#ff3c3c",
  SystemError2: "#ff7575",
};

export const color = (colorKey: ColorKey): string => {
  return colorsMap[colorKey];
};
