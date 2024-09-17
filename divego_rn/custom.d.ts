declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.jpg";
declare module "*.png";

declare module "react-native-dotenv" {
  export const HOST: string;
  export const GOOGLE_MAPS_API_KEY: string;
}
