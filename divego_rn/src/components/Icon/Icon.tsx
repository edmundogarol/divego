import React from "react";
import { IconProps, IconTypeEnum } from "./IconInterfaces";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GlyphIonicons from "./libraries/GlyphIonicon";
import GlyphFontAwesome5 from "./libraries/GlyphFontAwesome5";
import GlyphFontAwesome from "./libraries/GlyphFontAwesome";
import GlyphMaterialIcons from "./libraries/GlyphMaterialIcons";
import GlyphMaterialCommunityIcons from "./libraries/GlyphMaterialCommunityIcons";
import CustomSvgIcon, { CustomSvgIconName } from "./libraries/CustomSvgIcon";

const Icon: React.FunctionComponent<IconProps> = ({
  name,
  size = 18,
  type,
  style = {},
  color,
}) => {
  switch (type) {
    case IconTypeEnum.Ionicons:
      return (
        <Ionicons
          color={color}
          size={size}
          style={style}
          name={name as GlyphIonicons}
        />
      );
    case IconTypeEnum.FontAwesome5:
      return (
        <FontAwesome5
          color={color}
          size={size}
          style={style}
          name={name as GlyphFontAwesome5}
        />
      );
    case IconTypeEnum.MaterialIcons:
      return (
        <MaterialIcons
          color={color}
          size={size}
          style={style}
          name={name as GlyphMaterialIcons}
        />
      );
    case IconTypeEnum.MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          color={color}
          size={size}
          style={style}
          name={name as GlyphMaterialCommunityIcons}
        />
      );
    case IconTypeEnum.CustomSvgIcon:
      return (
        <CustomSvgIcon
          color={color}
          size={size}
          style={style}
          name={name as CustomSvgIconName}
        />
      );
    default:
      return (
        <FontAwesome
          color={12}
          size={size}
          style={style}
          name={name as GlyphFontAwesome}
        />
      );
  }
};

export default Icon;
