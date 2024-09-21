import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { ScreenContentsContainer } from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";
import {
  AmenitiesContainer,
  AmenityButton,
  ChangeDiveSiteImageButton,
  DiveSiteImageButtonsContainer,
  NominateDiveSiteDetailsFormContainer,
  NominateDiveSitePhoto,
  NominateDiveSitePhotoContainer,
} from "../NominateDiveSiteStyledComponents";
import useDirectoryState from "@pages/Directory/hooks/useDirectoryState";
import useDirectoryDispatch from "@pages/Directory/hooks/useDirectoryDispatch";
import environmentConfig from "@utils/environmentConfig";
import { Else, If } from "@components/If/If";
import { ButtonType } from "@components/Button/ButtonInterfaces";
import { launchImageLibrary } from "react-native-image-picker";
import { Label, Subtext } from "@components/Input/InputStyledComponents";
import useRenderAmenityIcon from "@pages/Directory/hooks/useRenderAmenityIcon";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";

const NominateDiveSiteDetailsForm: React.FunctionComponent<
  ScreenRenderProps
> = ({ screenKey, gotoPrevPage, gotoNextPage }) => {
  const { user } = useLoginState();
  const { updateSuggestedNearbyLocation, updateDiveSiteActiveAmenities } =
    useDirectoryDispatch();
  const {
    active_index,
    mapNominateLocation,
    suggestedNearbyLocation,
    diveSiteAmenityChoices,
  } = useDirectoryState();
  const renderInputIcon = useRenderInputIcon();
  const renderAmenityIcon = useRenderAmenityIcon();
  const diveSiteImage =
    suggestedNearbyLocation?.uploadedPhoto?.uri ||
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
      suggestedNearbyLocation?.photos &&
      suggestedNearbyLocation.photos[0].photo_reference
    }&key=${environmentConfig.GOOGLE_MAPS_API_KEY}`;

  const handleChoosePhoto = async () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response && response.assets) {
        updateSuggestedNearbyLocation({
          ...suggestedNearbyLocation,
          uploadedPhoto: response.assets[0],
        });
      }
    });
  };

  useCustomScreenOptions({
    title: "Dive Site Details",
    backButtonOnPress: () => gotoPrevPage(),
    rightButtonOnPress: () => gotoNextPage(),
    rightButtonDisabled:
      !user.current_location?.place_id || !user.first_name || !user.last_name,
    rightButtonText: "Submit",
    loadCondition: active_index.toString() === screenKey,
    depList: [active_index, user, suggestedNearbyLocation],
  });

  console.log({
    mapNominateLocation: mapNominateLocation?.description,
    suggestedNearbyLocation: suggestedNearbyLocation?.description,
  });
  return (
    <ScreenContentsContainer>
      <NominateDiveSiteDetailsFormContainer>
        <NominateDiveSitePhotoContainer>
          <If
            condition={
              (suggestedNearbyLocation?.uploadedPhoto &&
                !!suggestedNearbyLocation?.uploadedPhoto.uri) ||
              (suggestedNearbyLocation?.photos &&
                !!suggestedNearbyLocation?.photos[0])
            }>
            <NominateDiveSitePhoto
              source={{
                uri: diveSiteImage,
              }}
            />
            <Else>
              <Icon
                name="location-outline"
                type={IconTypeEnum.Ionicons}
                size={100}
                color={color("SystemBlue3")}
              />
            </Else>
          </If>
          <DiveSiteImageButtonsContainer>
            <ChangeDiveSiteImageButton
              type={ButtonType.HuggingOutline}
              text={"Change Dive Site Image"}
              onPress={() => handleChoosePhoto()}
              textStyle={{ fontSize: 14 }}
            />
            <ChangeDiveSiteImageButton
              type={ButtonType.HuggingOutline}
              text={"Reset Image"}
              onPress={() =>
                updateSuggestedNearbyLocation({
                  ...suggestedNearbyLocation,
                  uploadedPhoto: undefined,
                })
              }
              textStyle={{ fontSize: 14 }}
            />
          </DiveSiteImageButtonsContainer>
        </NominateDiveSitePhotoContainer>
        <Gap level={1} />
        <Gap level={1} />
        <Input
          label="Location Name"
          placeholder={"Enter Location Name"}
          value={suggestedNearbyLocation?.description}
          icon={renderInputIcon(
            "location-outline",
            IconTypeEnum.Ionicons,
            false,
          )}
          onChange={(e) => {
            updateSuggestedNearbyLocation({
              ...suggestedNearbyLocation,
              description: e.nativeEvent.text,
            });
          }}
        />
        <Gap level={1} />
        <Gap level={1} />
        <Label>{"Amenities"}</Label>
        <Subtext>{"Choose the facilities available in this dive site"}</Subtext>
        <AmenitiesContainer>
          {Object.keys(diveSiteAmenityChoices).map((amenity) => (
            <AmenityButton
              active={diveSiteAmenityChoices[amenity]}
              onPress={() => updateDiveSiteActiveAmenities(amenity)}>
              {renderAmenityIcon({
                type: amenity,
                active: diveSiteAmenityChoices[amenity],
              })}
            </AmenityButton>
          ))}
        </AmenitiesContainer>
      </NominateDiveSiteDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default NominateDiveSiteDetailsForm;
