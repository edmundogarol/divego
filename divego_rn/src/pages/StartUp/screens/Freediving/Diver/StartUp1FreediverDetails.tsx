import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import Select from "@components/Select/Select";
import {
  AgencyIconText,
  BackButton,
  BackButtonText,
  CertificationIconText,
  DiverDetailsFormContainer,
  DiverDetailsFormHeader,
  DiverIconBackground,
  DiverIconContainer,
  HeaderContainer,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import useGetFreedivingCertificationsListHandler from "@pages/StartUp/hooks/useGetFreedivingCertificationsListHandler";
import useStartUpDispatch from "@pages/StartUp/hooks/useStartUpDispatch";
import {
  FREEDIVE_AGENCY_SELECT_ITEMS,
  FREEDIVE_CERTIFICATIONS_SHORTENED,
} from "@utils/constants";
import { useFreedivingCertificationsListByAgency } from "@pages/StartUp/hooks/useFreedivingCertificationsListByAgency";
import {
  FreediveAgencyEnum,
  FreediveCertificationEnum,
} from "@interfaces/CustomTypes";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import { If } from "@components/If/If";

const StartUp1FreediverDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage }) => {
  const { active_index, freediver, agency } = useStartUpState();
  const { updateStartUpAgency, updateStartUpFreediver } = useStartUpDispatch();
  const renderInputIcon = useRenderInputIcon();
  const freedivingCertificationsListByAgency =
    useFreedivingCertificationsListByAgency();

  useGetFreedivingCertificationsListHandler(active_index.toString() === "1");

  const getIconBackgroundColor = () => {
    switch (agency) {
      case FreediveAgencyEnum.Molchanovs:
        return color("SystemBlue4");
      case FreediveAgencyEnum.Aida:
        return color("SystemBlue3");
      case FreediveAgencyEnum.Padi:
        return color("SystemError2");
      case FreediveAgencyEnum.Other:
        return color("SystemLabel1");
      default:
        return color("SystemLabel1");
    }
  };

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <BackButton
          onPress={() => {
            gotoPrevPage();
            updateStartUpAgency(null);
          }}>
          <BackButtonText>{"Back"}</BackButtonText>
        </BackButton>
        <HeaderContainer>
          <DiverDetailsFormHeader>{"Freediver Details"}</DiverDetailsFormHeader>
        </HeaderContainer>
        <Gap level={2} />
        <DiverIconBackground>
          <DiverIconContainer clr={getIconBackgroundColor()}>
            <Icon
              name={"UserDiverIcon"}
              type={IconTypeEnum.CustomSvgIcon}
              size={130}
              color={color("SystemBlue2")}
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
        <Gap level={2} />

        <Select
          value={agency}
          label="Freediving Agency"
          placeholder={"Choose your Freediving Agency"}
          endIcon={renderInputIcon(
            "chevron-down",
            IconTypeEnum.FontAwesome,
            false,
          )}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onValueChange={(agencyItem: FreediveAgencyEnum) => {
            updateStartUpAgency(agencyItem);

            if (agencyItem === FreediveAgencyEnum.NonCertified) {
              updateStartUpFreediver({
                ...freediver,
                certification: FreediveCertificationEnum.NON_CERT,
              });
            } else if (agencyItem === FreediveAgencyEnum.Other) {
              updateStartUpFreediver({
                ...freediver,
                certification: FreediveCertificationEnum.OTHER_CERT,
              });
            } else {
              console.log("set cert as undefined");
              updateStartUpFreediver({
                ...freediver,
                certification: null,
              });
            }
          }}
          items={FREEDIVE_AGENCY_SELECT_ITEMS}
        />
        <Gap level={1} />
        <Select
          value={freediver?.certification}
          disabled={
            !agency ||
            freediver.certification === FreediveCertificationEnum.NON_CERT ||
            freediver.certification === FreediveCertificationEnum.OTHER_CERT
          }
          label="Freedive Certification"
          placeholder={"Choose your Freediving Certification"}
          endIcon={renderInputIcon(
            "chevron-down",
            IconTypeEnum.FontAwesome,
            false,
          )}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onValueChange={(cert: FreediveCertificationEnum) => {
            updateStartUpFreediver({ ...freediver, certification: cert });
          }}
          items={freedivingCertificationsListByAgency()}
        />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp1FreediverDetails;
