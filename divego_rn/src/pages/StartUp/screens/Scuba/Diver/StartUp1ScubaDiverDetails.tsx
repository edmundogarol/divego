import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import Select from "@components/Select/Select";
import {
  BackButton,
  BackButtonText,
  DiverDetailsFormContainer,
  DiverDetailsFormHeader,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";

const StartUp1ScubaDiverDetails: React.FunctionComponent<ScreenRenderProps> = ({
  gotoPrevPage,
}) => {
  const renderInputIcon = useRenderInputIcon();

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <BackButton onPress={() => gotoPrevPage()}>
          <BackButtonText>{"Back"}</BackButtonText>
        </BackButton>
        <DiverDetailsFormHeader>{"Scuba Diver Details"}</DiverDetailsFormHeader>
        <Gap level={3} />
        <Select
          label="Scuba Certification"
          endIcon={renderInputIcon(
            "chevron-down",
            IconTypeEnum.FontAwesome,
            false,
          )}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" },
          ]}
        />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp1ScubaDiverDetails;
