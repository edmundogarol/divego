import { ColorValue, TextStyle, ViewStyle } from "react-native";
import GlyphIonIcons from "./libraries/GlyphIonicon";
import GlyphFontAwesome from "./libraries/GlyphFontAwesome";
import GlyphFontAwesome5 from "./libraries/GlyphFontAwesome5";
import GlyphMaterialIcons from "./libraries/GlyphMaterialIcons";
import GlyphMaterialCommunityIcons from "./libraries/GlyphMaterialCommunityIcons";
import { CustomSvgIconName } from "./libraries/CustomSvgIcon";

export type IconGlyph =
  | GlyphFontAwesome
  | GlyphFontAwesome5
  | GlyphIonIcons
  | GlyphMaterialIcons
  | GlyphMaterialCommunityIcons
  | CustomSvgIconName;

export enum IconTypeEnum {
  FontAwesome = "FontAwesome",
  FontAwesome5 = "FontAwesome5",
  Ionicons = "Ionicons",
  MaterialIcons = "MaterialIcons",
  MaterialCommunityIcons = "MaterialCommunityIcons",
  CustomSvgIcon = "CustomSvgIconName",
}

export interface IconProps {
  name: IconGlyph;
  size?: number;
  style?: ViewStyle | TextStyle | ViewStyle[] | TextStyle[];
  type?: IconTypeEnum;
  color?: ColorValue;
  onPress?: () => void;
  iconProps?: IconProps;
}
