import Icon from "@components/Icon/Icon";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Style } from "@components/Icon/IconStyle";
import { color } from "@styles/colors";
import { Pressable } from "react-native";

const useRenderInputIcon = (): ((
  inputName: IconGlyph,
  inputType: IconTypeEnum,
  error: boolean,
  onPress?: () => void,
) => JSX.Element) => {
  return (
    inputName: IconGlyph,
    inputType: IconTypeEnum,
    error: boolean,
    onPress?: () => void,
  ) => (
    <Pressable onPress={onPress}>
      <Icon
        name={inputName}
        type={inputType}
        style={{
          ...Style.icon,
          ...{
            color: !!error ? color("SystemError2") : color("SystemLabel1"),
          },
        }}
      />
    </Pressable>
  );
};

export default useRenderInputIcon;
