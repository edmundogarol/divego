import {
  FreediveAgencyEnum,
  FreediveCertificationEnum,
  Freediver,
} from "@interfaces/CustomTypes";
import { color } from "@styles/colors";
import {
  AgencyIconText,
  CertificationIconText,
  DiverIconBackground,
  DiverIconContainer,
} from "./DiverBadgeStyledComponents";
import Icon from "@components/Icon/Icon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { If } from "@components/If/If";
import { FREEDIVE_CERTIFICATIONS_SHORTENED } from "@utils/constants";

const DiverBadge: React.FunctionComponent<{
  agency: FreediveAgencyEnum | null;
  freediver: Freediver;
}> = ({ agency, freediver }) => {
  const getIconBackgroundColor = () => {
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

  const getIconColor = () => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
      case FreediveAgencyEnum.Padi:
      case FreediveAgencyEnum.Aida:
      case FreediveAgencyEnum.Other:
      default:
        return color("SystemWhite");
    }
  };

  return (
    <DiverIconBackground>
      <DiverIconContainer clr={getIconBackgroundColor()}>
        <Icon
          name={"UserDiverIcon"}
          type={IconTypeEnum.CustomSvgIcon}
          size={130}
          color={getIconColor()}
        />
        <If condition={agency === FreediveAgencyEnum.Molchanovs}>
          <AgencyIconText>{"MOLCHANOVS"}</AgencyIconText>
        </If>
        <If condition={agency === FreediveAgencyEnum.Aida}>
          <AgencyIconText>{"AIDA"}</AgencyIconText>
        </If>
        <If condition={agency === FreediveAgencyEnum.Padi}>
          <AgencyIconText>{"PADI"}</AgencyIconText>
        </If>
        <If condition={agency === FreediveAgencyEnum.NonCertified}>
          <AgencyIconText>{"NOT-CERTIFIED"}</AgencyIconText>
        </If>
        <If condition={agency === FreediveAgencyEnum.Other}>
          <AgencyIconText>{"OTHER"}</AgencyIconText>
        </If>
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
