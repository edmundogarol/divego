import { useState } from "react";
import {
  ProfilePictureBadgeContainer,
  ProfilePictureImage,
  ProfilePictureUploadButton,
  ProfilePictureUploadIconContainer,
  ProfilePictureUploaderContainer,
  ProfilePictureUploaderRemoveContainer,
} from "@components/ProfilePicture/ProfilePictureStyledComponents";
import Icon from "@components/Icon/Icon";
import { Else, If } from "@components/If/If";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import DiverBadge from "@components/DiverBadge/DiverBadge";
import { color } from "@styles/colors";
import Gap from "@components/Gap/Gap";
import { Alert } from "react-native";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import useLoginState from "@pages/Login/hooks/useLoginState";

const ProfilePictureUploader: React.FunctionComponent = () => {
  const [photo, setPhoto] = useState<Asset | null>(null);
  const { updateUser } = useLoginDispatch();
  const { user } = useLoginState();
  const { agency, freediver } = useStartUpState();

  const handleChoosePhoto = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response && response.assets) {
        updateUser({ ...user, image: response.assets[0] });
      }
    });
  };

  return (
    <ProfilePictureUploaderContainer>
      <If condition={!!photo}>
        <ProfilePictureUploaderRemoveContainer
          onPress={() => {
            Alert.alert(
              "Remove Profile Picture?",
              "Are you sure you want to remove your picture?",
              [
                {
                  text: "Cancel",
                },
                {
                  text: "Remove",
                  onPress: () => updateUser({ ...user, image: undefined }),
                },
              ],
            );
          }}>
          <Icon
            name="remove"
            type={IconTypeEnum.FontAwesome}
            size={20}
            color={color("SystemBlue2")}
          />
        </ProfilePictureUploaderRemoveContainer>
      </If>
      <If condition={!!user.image}>
        <ProfilePictureImage
          source={{ uri: (user.image as Asset)?.uri }}
          style={{ width: 100, height: 100 }}
        />
        <Else>
          <Icon
            name="user-circle-o"
            type={IconTypeEnum.FontAwesome}
            size={100}
            color={color("SystemBlue3")}
          />
        </Else>
      </If>
      <ProfilePictureBadgeContainer scale={0.35}>
        <DiverBadge agency={agency} freediver={freediver} />
      </ProfilePictureBadgeContainer>
      <Gap level={2} />
      <ProfilePictureUploadButton
        title={
          !!user.image ? "Change Profile Picture" : "Choose Profile Picture"
        }
        onPress={() => handleChoosePhoto()}
      />
    </ProfilePictureUploaderContainer>
  );
};

export default ProfilePictureUploader;
