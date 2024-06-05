import {
  FreediveAgencyEnum,
  FreediveCertificationEnum,
  Freediver,
  FreediverTypeEnum,
} from "@interfaces/CustomTypes";
import { color } from "@styles/colors";
import {
  AgencyIconText,
  BadgeBackgroundIcon,
  CertificationIconText,
  DiverIconBackground,
  DiverIconContainer,
} from "./DiverBadgeStyledComponents";
import Icon from "@components/Icon/Icon";
import { IconGlyph, IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import { FREEDIVE_CERTIFICATIONS_SHORTENED } from "@utils/constants";

const DiverBadge: React.FunctionComponent<{
  agency: FreediveAgencyEnum | null;
  freediver: Freediver;
}> = ({ agency, freediver }) => {
  const getIconBackgroundColor = (): string => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
        return color("MolchanovsBlue");
      case FreediveAgencyEnum.Aida:
        return color("AidaBlueLowerOp");
      case FreediveAgencyEnum.Padi:
        return color("PadiRedLowerOp");
      case FreediveAgencyEnum.Other:
        return color("SystemTeal");
      default:
        return color("SystemLabel1");
    }
  };

  const getIconColor = (): string => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
      case FreediveAgencyEnum.Padi:
      case FreediveAgencyEnum.Aida:
      case FreediveAgencyEnum.Other:
      default:
        return color("SystemWhite");
    }
  };

  const getBackgroundIcon = (): IconGlyph => {
    switch (freediver.freediver_type) {
      case FreediverTypeEnum.FUN_DIVER:
        return "CoralBadgeIcon";
      case FreediverTypeEnum.LINE_DIVER:
        return "BuoyBadgeIcon";
      case FreediverTypeEnum.SPEAR_FISHER:
        return "SpearfishBadgeIcon";
      default:
        return "question-mark";
    }
  };

  const getBackgroundIconDisplacement = (): {
    bottom: number;
    right: number;
  } => {
    switch (freediver.freediver_type) {
      case FreediverTypeEnum.SPEAR_FISHER:
        return { bottom: -50, right: -10 };
      case FreediverTypeEnum.FUN_DIVER:
      case FreediverTypeEnum.LINE_DIVER:
      default:
        return { bottom: -60, right: -10 };
    }
  };

  const getAgencyText = (): string => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
        return "MOLCH";
      case FreediveAgencyEnum.Padi:
        return "PADI";
      case FreediveAgencyEnum.Aida:
        return "AIDA";
      case FreediveAgencyEnum.Other:
        return "OTHER";
      case FreediveAgencyEnum.NonCertified:
        return "NON-C";
      default:
        return "AGENCY";
    }
  };

  const getAgencyFontSize = (): number => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
        return 50;
      case FreediveAgencyEnum.Padi:
        return 50;
      case FreediveAgencyEnum.Aida:
        return 50;
      case FreediveAgencyEnum.Other:
        return 50;
      case FreediveAgencyEnum.NonCertified:
        return 50;
      default:
        return 40;
    }
  };

  const getAgencyFontSpacing = (): number => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
        return -4;
      case FreediveAgencyEnum.Padi:
      case FreediveAgencyEnum.Aida:
      case FreediveAgencyEnum.Other:
      case FreediveAgencyEnum.NonCertified:
      default:
        return 0;
    }
  };

  return (
    <DiverIconBackground>
      <DiverIconContainer clr={getIconBackgroundColor()}>
        <If condition={!!freediver.freediver_type}>
          <BadgeBackgroundIcon
            name={getBackgroundIcon()}
            type={IconTypeEnum.CustomSvgIcon}
            size={180}
            color={color("SystemBlue4")}
            displacement={getBackgroundIconDisplacement()}
          />
        </If>
        <Icon
          name={"UserDiverIcon"}
          type={IconTypeEnum.CustomSvgIcon}
          size={50}
          color={getIconColor()}
        />
        <AgencyIconText
          fontSize={getAgencyFontSize()}
          fontSpacing={getAgencyFontSpacing()}>
          {getAgencyText()}
        </AgencyIconText>
        <If condition={!!agency && !!freediver.certification}>
          <CertificationIconText>
            {
              FREEDIVE_CERTIFICATIONS_SHORTENED[
                freediver.certification
                  ? freediver.certification
                  : FreediveCertificationEnum.NON_CERT
              ]
            }
          </CertificationIconText>
        </If>
      </DiverIconContainer>
    </DiverIconBackground>
  );
};

export default DiverBadge;
