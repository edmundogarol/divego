import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import {
  DiverDetailsFormContainer,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import Input from "@components/Input/Input";
import useCheckStartUpFreediverHasUnsaved from "@pages/StartUp/hooks/useCheckStartUpFreediverHasUnsaved";
import useUnsavedChanges from "@utils/hooks/useUnsavedChanges";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useStartUp1FreediverDetailsComplete from "@pages/StartUp/hooks/useStartUp1FreediverDetailsComplete";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import ProfilePictureUploader from "@components/ProfilePicture/ProfilePictureUploader";

const StartUp2ContactDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage, gotoNextPage }) => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { active_index } = useStartUpState();
  const renderInputIcon = useRenderInputIcon();
  const checkStartUpFreediverHasUnsaved = useCheckStartUpFreediverHasUnsaved();
  const startUp1FreediverDetailsComplete =
    useStartUp1FreediverDetailsComplete();
  const unsavedChanges = useUnsavedChanges(
    checkStartUpFreediverHasUnsaved(),
    () => {
      gotoPrevPage();
    },
    gotoPrevPage,
  );

  useCustomScreenOptions({
    title: "Contact Details",
    backButtonOnPress: () => {
      if (active_index === 1) {
        unsavedChanges();
      } else {
        gotoPrevPage();
      }
    },
    rightButtonOnPress: () => alert("Next"),
    rightButtonDisabled: !startUp1FreediverDetailsComplete(),
    rightButtonText: "Next",
    depList: [active_index],
    loadCondition: active_index === 2,
  });

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <Gap level={1} />
        <ProfilePictureUploader />
        <Gap level={1} />
        <Input
          label="First Name"
          placeholder={"Enter First Name"}
          value={user.first_name}
          disabled={!!user.first_name}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onChange={(e) => {
            updateUser({
              ...user,
              first_name: e.nativeEvent.text,
            });
          }}
        />

        <Input
          label="Last Name"
          placeholder={"Enter Last Name"}
          value={user.last_name}
          disabled={!!user.last_name}
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onChange={(e) => {
            updateUser({
              ...user,
              last_name: e.nativeEvent.text,
            });
          }}
        />
        <Gap level={1} />
        <Gap level={1} />
        <Gap level={1} />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp2ContactDetails;
