export type ColorKey =
  | "SystemBlue1"
  | "SystemBlue2"
  | "SystemBlue3"
  | "SystemBlue4"
  | "SystemLabel1"
  | "SystemLabel2"
  | "SystemGrey1"
  | "SystemError1"
  | "SystemError2"
  | "SystemSuccess1"
  | "SystemSuccess2"
  | "SystemLabel3"
  | "SystemTeal"
  | "SystemPurple"
  | "SystemWhite"
  | "SystemScubaDiver"
  | "SystemScubaInstructor"
  | "SystemScubaShop"
  | "MolchanovsBlue"
  | "MolchanovsBlueLowerOp"
  | "AidaBlue"
  | "AidaBlueLowerOp"
  | "PadiRed"
  | "PadiRedLowerOp";

const colorsMap = {
  SystemBlue1: "#1a2241",
  SystemBlue2: "#2e4365",
  SystemBlue3: "#658fb5",
  SystemBlue4: "#b7d3e8",
  SystemLabel1: "#adadad",
  SystemLabel2: "#323232",
  SystemLabel3: "#737373",
  SystemGrey1: "#cecece",
  SystemError1: "#ff3c3c",
  SystemError2: "#ff7575",
  SystemSuccess1: "#7dc770",
  SystemSuccess2: "#5e9f53",
  SystemTeal: "#66d3bf",
  SystemPurple: "#b27cdc",
  SystemScubaDiver: "#004391",
  SystemScubaInstructor: "#ff836d",
  SystemScubaShop: "#00b9b9",

  SystemWhite: "#ffffff",

  MolchanovsBlue: "#009dc1",
  AidaBlue: "#00507e",
  PadiRed: "#e61b23",
  MolchanovsBlueLowerOp: "#07c2ec",
  AidaBlueLowerOp: "#007ec6",
  PadiRedLowerOp: "#ff5258",
};

export const color = (colorKey: ColorKey): string => {
  return colorsMap[colorKey];
};
