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

const StartUp1FreediveInstructorDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage }) => {
  const renderInputIcon = useRenderInputIcon();

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <BackButton onPress={() => gotoPrevPage()}>
          <BackButtonText>{"Back"}</BackButtonText>
        </BackButton>
        <HeaderContainer>
          <DiverDetailsFormHeader>
            {"Freediving Instructor Details"}
          </DiverDetailsFormHeader>
        </HeaderContainer>
        <Gap level={3} />
        <Select
          label="Instructor Certification"
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
        <Gap level={1} />
        <Select
          label="Instructor Certification"
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

export default StartUp1FreediveInstructorDetails;
