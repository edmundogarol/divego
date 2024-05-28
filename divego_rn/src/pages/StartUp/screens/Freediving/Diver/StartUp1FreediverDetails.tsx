import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import Select from "@components/Select/Select";
import {
  BackButton,
  BackButtonText,
  DiverDetailsFormContainer,
  DiverDetailsFormHeader,
  HeaderContainer,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import useGetFreedivingCertificationsListHandler from "@pages/StartUp/hooks/useGetFreedivingCertificationsListHandler";
import useStartUpDispatch from "@pages/StartUp/hooks/useStartUpDispatch";
import { FREEDIVE_AGENCY_SELECT_ITEMS } from "@utils/constants";
import { useFreedivingCertificationsListByAgency } from "@pages/StartUp/hooks/useFreedivingCertificationsListByAgency";
import { FreediveAgencyEnum } from "@interfaces/CustomTypes";

const StartUp1FreediverDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage }) => {
  const { active_index } = useStartUpState();
  const { updateStartUpAgency } = useStartUpDispatch();
  const renderInputIcon = useRenderInputIcon();
  const freedivingCertificationsListByAgency =
    useFreedivingCertificationsListByAgency();

  useGetFreedivingCertificationsListHandler(active_index.toString() === "1");

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
        <Gap level={3} />
        <Select
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
          }}
          items={FREEDIVE_AGENCY_SELECT_ITEMS}
        />
        <Gap level={1} />
        <Select
          disabled={true}
          label="Freedive Certification"
          placeholder={"Choose your Freediving Certification"}
          endIcon={renderInputIcon(
            "chevron-down",
            IconTypeEnum.FontAwesome,
            false,
          )}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onValueChange={(value) => console.log({ freediveCertValue: value })}
          items={freedivingCertificationsListByAgency()}
        />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp1FreediverDetails;
