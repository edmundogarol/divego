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
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";
import { initialState } from "@pages/Login/LoginState";
import useCurrentLocationPlaceDetailsHandler from "@pages/Directory/hooks/useCurrentLocationPlaceDetailsHandler";
import { useHandleUserCurrentLocationUpdateCallback } from "@hooks/location/useHandleUserCurrentLocationUpdateCallback";

const StartUp2ContactDetails: React.FunctionComponent<ScreenRenderProps> = ({
  screenKey,
  gotoPrevPage,
  gotoNextPage,
}) => {
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { active_index } = useStartUpState();
  const renderInputIcon = useRenderInputIcon();
  const handleUserCurrentLocationUpdateCallback =
    useHandleUserCurrentLocationUpdateCallback();

  useCurrentLocationPlaceDetailsHandler();
  useCustomScreenOptions({
    title: "Contact Details",
    backButtonOnPress: () => gotoPrevPage(),
    rightButtonOnPress: () => gotoNextPage(),
    rightButtonDisabled:
      !user.current_location?.place_id || !user.first_name || !user.last_name,
    rightButtonText: "Next",
    depList: [active_index, user],
    loadCondition: active_index.toString() === screenKey,
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

        <Input
          label="Current City"
          googleAutoComplete
          placeholder={"Select current city"}
          icon={renderInputIcon("location", IconTypeEnum.Ionicons, false)}
          onGoogleAutoCompleteChange={(data) => {
            updateUser({
              ...user,
              current_location: {
                ...user.current_location,
                place_id: data.place_id,
                description: data.description,
                main: data.structured_formatting.main_text,
                coordinates: initialState.user.current_location?.coordinates,
              },
            });
          }}
          updateCallback={handleUserCurrentLocationUpdateCallback}
          subtext="We will use this to show you nearby, recommended dive sites."
        />
        <Gap level={1} />
        <Gap level={1} />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default StartUp2ContactDetails;
