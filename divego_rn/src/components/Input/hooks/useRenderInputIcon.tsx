import Icon from "@components/Icon/Icon";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Style } from "@components/Icon/IconStyle";
import { color } from "@styles/colors";

const useRenderInputIcon = (): ((
  inputName: IconGlyph,
  inputType: IconTypeEnum,
  error: boolean,
) => JSX.Element) => {
  return (inputName: IconGlyph, inputType: IconTypeEnum, error: boolean) => (
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
  );
};

export default useRenderInputIcon;
