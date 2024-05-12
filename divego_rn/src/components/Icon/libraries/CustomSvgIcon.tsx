import React from "react";
import { ColorValue, ViewStyle } from "react-native";
import UserDiverIcon from "@assets/user-diver-icon.svg";
import BuoyIcon from "@assets/buoy-icon.svg";
import FinsIcon from "@assets/fins-icon.svg";
import { color as colorLibrary } from "@styles/colors";

export type CustomSvgIconName = "UserDiverIcon" | "BuoyIcon" | "FinsIcon";

interface CustomSvgIconProps {
  name: CustomSvgIconName;
  color?: ColorValue;
  width?: number;
  height?: number;
  size?: number;
  style?: ViewStyle | ViewStyle[];
}

const CustomSvgIcon: React.FunctionComponent<CustomSvgIconProps> = ({
  name,
  width,
  height,
  color = colorLibrary("SystemWhite"),
  size,
  style,
}) => {
  const w = size ? size : width || 48;
  const h = size ? size : height || 48;

  switch (name) {
    case "UserDiverIcon":
      return (
        <UserDiverIcon
          style={style}
          fontSize={size}
          fill={color}
          width={w}
          height={h}
        />
      );
    case "BuoyIcon":
      return (
        <BuoyIcon
          style={style}
          fontSize={size}
          fill={color}
          width={w}
          height={h}
        />
      );
    case "FinsIcon":
      return (
        <FinsIcon
          style={style}
          fontSize={size}
          fill={color}
          width={w}
          height={h}
        />
      );
    default:
      console.error("Invalid iconName", name);
      return null;
  }
};

export default CustomSvgIcon;
