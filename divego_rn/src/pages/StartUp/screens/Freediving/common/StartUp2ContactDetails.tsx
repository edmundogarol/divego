import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import {
  DiverDetailsFormContainer,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import Input from "@components/Input/Input";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import ProfilePictureUploader from "@components/ProfilePicture/ProfilePictureUploader";
import InputInternationalPhone from "@components/Input/InputInternationalPhone";

const StartUp2ContactDetails: React.FunctionComponent<{
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}> = ({ gotoPrevPage, gotoNextPage }) => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { active_index, freediver } = useStartUpState();
  const renderInputIcon = useRenderInputIcon();

  useCustomScreenOptions({
    title: "Contact Details",
    backButtonOnPress: () => {
      gotoPrevPage();
    },
    rightButtonOnPress: () => console.log({ user, freediver }),
    rightButtonDisabled:
      !user.current_location?.place_id || !user.first_name || !user.last_name,
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
          icon={renderInputIcon("user-o", IconTypeEnum.FontAwesome, false)}
          onChange={(e) => {
            updateUser({
              ...user,
              last_name: e.nativeEvent.text,
            });
          }}
        />
        <Gap level={1} />

        <InputInternationalPhone
          label="Contact Number"
          value={user.phone}
          onChangePhoneNumber={(number) => {
            updateUser({
              ...user,
              phone: number,
            });
          }}
          country={user.phoneCountry}
          onChangeSelectedCountry={(country) => {
            updateUser({
              ...user,
              phoneCountry: country,
            });
          }}
          subtext="This will remain hidden until you choose to make it visible to new dive buddy connections"
        />

        <Gap level={1} />
        <Input
          label="Current City"
          googleAutoComplete
          placeholder={"Select current city"}
          value={user.current_location?.description}
          icon={renderInputIcon("location", IconTypeEnum.Ionicons, false)}
          onGoogleAutoCompleteChange={(data) => {
            updateUser({
              ...user,
              current_location: {
                ...user.current_location,
                place_id: data.place_id,
                description: data.description,
              },
            });
          }}
        />
        <Gap level={1} />
        <Gap level={1} />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp2ContactDetails;
