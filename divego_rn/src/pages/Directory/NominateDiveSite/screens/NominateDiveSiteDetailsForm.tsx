import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { ScreenContentsContainer } from "@pages/StartUp/StartUpStyledComponents";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Gap from "@components/Gap/Gap";
import Input from "@components/Input/Input";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";
import {
  NominateDiveSiteDetailsFormContainer,
  NominateDiveSitePhoto,
  NominateDiveSitePhotoContainer,
} from "../NominateDiveSiteStyledComponents";
import useDirectoryState from "@pages/Directory/hooks/useDirectoryState";
import useDirectoryDispatch from "@pages/Directory/hooks/useDirectoryDispatch";
import environmentConfig from "@utils/environmentConfig";
import { If } from "@components/If/If";

const NominateDiveSiteDetailsForm: React.FunctionComponent<
  ScreenRenderProps
> = ({ screenKey, gotoPrevPage, gotoNextPage }) => {
  const { user } = useLoginState();
  const { updateSuggestedNearbyLocation } = useDirectoryDispatch();
  const { active_index, mapNominateLocation, suggestedNearbyLocation } =
    useDirectoryState();
  const renderInputIcon = useRenderInputIcon();

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
        <If
          condition={
            suggestedNearbyLocation?.photos &&
            !!suggestedNearbyLocation?.photos[0]
          }>
          <NominateDiveSitePhotoContainer>
            <NominateDiveSitePhoto
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                  suggestedNearbyLocation?.photos &&
                  suggestedNearbyLocation.photos[0].photo_reference
                }&key=${environmentConfig.GOOGLE_MAPS_API_KEY}`,
              }}
            />
          </NominateDiveSitePhotoContainer>
        </If>
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
      </NominateDiveSiteDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default NominateDiveSiteDetailsForm;
