import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import Select from "@components/Select/Select";
import {
  DiverDetailsFormContainer,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import useGetFreedivingCertificationsListHandler from "@pages/StartUp/hooks/useGetFreedivingCertificationsListHandler";
import useStartUpDispatch from "@pages/StartUp/hooks/useStartUpDispatch";
import { FREEDIVE_AGENCY_SELECT_ITEMS } from "@utils/constants";
import { useFreedivingCertificationsListByAgency } from "@pages/StartUp/hooks/useFreedivingCertificationsListByAgency";
import {
  FreediveAgencyEnum,
  FreediveCertificationEnum,
  FreediverTypeEnum,
} from "@interfaces/CustomTypes";
import DiverBadge from "@components/DiverBadge/DiverBadge";
import Input from "@components/Input/Input";
import useCheckStartUpFreediverHasUnsaved from "@pages/StartUp/hooks/useCheckStartUpFreediverHasUnsaved";
import useUnsavedChanges from "@utils/hooks/useUnsavedChanges";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useStartUp1FreediverDetailsComplete from "@pages/StartUp/hooks/useStartUp1FreediverDetailsComplete";

const StartUp1FreediverDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage, gotoNextPage }) => {
  const { active_index, freediver, agency } = useStartUpState();
  const { updateStartUpAgency, updateStartUpFreediver, resetStartUpFreediver } =
    useStartUpDispatch();
  const renderInputIcon = useRenderInputIcon();
  const freedivingCertificationsListByAgency =
    useFreedivingCertificationsListByAgency();
  const checkStartUpFreediverHasUnsaved = useCheckStartUpFreediverHasUnsaved();
  const startUp1FreediverDetailsComplete =
    useStartUp1FreediverDetailsComplete();
  const unsavedChanges = useUnsavedChanges(
    checkStartUpFreediverHasUnsaved(),
    () => {
      gotoPrevPage();
      resetStartUpFreediver();
    },
    gotoPrevPage,
  );

  useGetFreedivingCertificationsListHandler(active_index.toString() === "1");
  useCustomScreenOptions({
    title: "Freediver Details",
    backButtonOnPress: () => {
      if (active_index === 1) {
        unsavedChanges();
      } else {
        gotoPrevPage();
      }
    },
    rightButtonOnPress: () => gotoNextPage(),
    rightButtonDisabled: !startUp1FreediverDetailsComplete(),
    rightButtonText: "Next",
    depList: [active_index],
    loadCondition: active_index === 1,
  });

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <Gap level={1} />
        <DiverBadge agency={agency} freediver={freediver} />
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
          label="Freediving Certification"
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
        <Gap level={1} />
        <Input
          onChange={(e) => {
            updateStartUpFreediver({
              ...freediver,
              certification_number: e.nativeEvent.text,
            });
          }}
          icon={renderInputIcon(
            "drivers-license-o",
            IconTypeEnum.FontAwesome,
            false,
          )}
          placeholder={
            !freediver.certification
              ? "Enter Certification Number"
              : freediver.certification === FreediveCertificationEnum.NON_CERT
              ? "N/A"
              : "Enter Certification Number"
          }
          disabled={
            !freediver.certification ||
            freediver.certification === FreediveCertificationEnum.NON_CERT
          }
          label="Certification Number"
          subtext={
            !freediver.certification ||
            freediver.certification === FreediveCertificationEnum.NON_CERT
              ? undefined
              : "This will be used to verify your diver certification. If verification fails, your profile will be reverted to Non-Certified."
          }
          value={freediver.certification_number}
        />
        <Gap level={1} />
        <Select
          value={freediver?.freediver_type}
          disabled={!agency}
          label="Diver Type"
          placeholder={"Choose your Freediver Type"}
          endIcon={renderInputIcon(
            "chevron-down",
            IconTypeEnum.FontAwesome,
            false,
          )}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onValueChange={(type: FreediverTypeEnum) => {
            updateStartUpFreediver({ ...freediver, freediver_type: type });
          }}
          items={[
            { value: FreediverTypeEnum.FUN_DIVER, label: "Fun Diver" },
            { value: FreediverTypeEnum.LINE_DIVER, label: "Line Diver" },
            { value: FreediverTypeEnum.SPEAR_FISHER, label: "Spear Fisher" },
          ]}
          subtext={
            !freediver.certification ||
            freediver.certification === FreediveCertificationEnum.NON_CERT
              ? undefined
              : "This will be the main diver type associated with your profile. Later you can assign multiple dive types to planned dives."
          }
        />
        <Gap level={1} />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp1FreediverDetails;
