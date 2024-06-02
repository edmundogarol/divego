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

const ProfilePictureUploader: React.FunctionComponent = () => {
  const [photo, setPhoto] = useState<Asset | null>(null);
  const { agency, freediver } = useStartUpState();

  const handleChoosePhoto = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response && response.assets) {
        setPhoto(response.assets[0]);
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
                  onPress: () => setPhoto(null),
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
      <If condition={!!photo}>
        <ProfilePictureImage
          source={{ uri: photo?.uri }}
          style={{ width: 130, height: 130 }}
        />
        <Else>
          <Icon
            name="user-circle-o"
            type={IconTypeEnum.FontAwesome}
            size={130}
            color={color("SystemBlue3")}
          />
        </Else>
      </If>
      <ProfilePictureBadgeContainer scale={0.4}>
        <DiverBadge agency={agency} freediver={freediver} />
      </ProfilePictureBadgeContainer>
      <Gap level={2} />
      <ProfilePictureUploadButton
        title={!!photo ? "Change Profile Picture" : "Choose Profile Picture"}
        onPress={() => handleChoosePhoto()}
      />
    </ProfilePictureUploaderContainer>
  );
};

export default ProfilePictureUploader;
