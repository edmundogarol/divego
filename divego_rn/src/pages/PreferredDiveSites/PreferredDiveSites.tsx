import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { PageEnum } from "@interfaces/NavigationTypes";
import {
  AddDiveSiteContainer,
  AddDiveSiteTitle,
  DiverDetailsFormContainer,
  DiveSiteContainer,
  DiveSiteIcon,
  DiveSiteIconContainer,
  DiveSiteImageBackground,
  DiveSitesListContainer,
  DiveSiteTitle,
  DiveSiteTitleContainer,
  EmptyDiveSiteContainer,
  ScreenContentsContainer,
} from "./PreferredDiveSitesStyledComponents";
import useDirectoryState from "@pages/Directory/hooks/useDirectoryState";
import { ImageBackground, Pressable } from "react-native";

interface PreferredDiveSitesProps {
  preferredDiveSites: number[];
  directoryPage: PageEnum;
  updatePreferredDiveSites: (diveSites: number[]) => void;
}

const PreferredDiveSites: React.FunctionComponent<PreferredDiveSitesProps> = ({
  preferredDiveSites,
  updatePreferredDiveSites,
  directoryPage,
}) => {
  const { nearbyLocations } = useDirectoryState();
  const navigation = useReactNavigation();

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <DiveSitesListContainer>
          <AddDiveSiteContainer
            onPress={() => navigation.navigate(directoryPage)}>
            <Icon
              color={color("SystemWhite")}
              name={"map-plus"}
              type={IconTypeEnum.MaterialCommunityIcons}
              size={70}
            />
            <AddDiveSiteTitle>{"Add Dive Site"}</AddDiveSiteTitle>
          </AddDiveSiteContainer>
          {preferredDiveSites.map((id: number, idx) => (
            <DiveSiteContainer key={idx}>
              <DiveSiteTitleContainer>
                <DiveSiteTitle>{nearbyLocations[id].description}</DiveSiteTitle>
              </DiveSiteTitleContainer>
              <DiveSiteImageBackground source={nearbyLocations[id].mapPhoto} />
              <DiveSiteIconContainer
                onPress={() =>
                  updatePreferredDiveSites(
                    preferredDiveSites.filter((location) => location !== id),
                  )
                }>
                <DiveSiteIcon
                  name={"trash"}
                  type={IconTypeEnum.FontAwesome}
                  size={40}
                />
              </DiveSiteIconContainer>
            </DiveSiteContainer>
          ))}
          {Array.from(
            { length: 3 - preferredDiveSites.length },
            (v, index) => index,
          ).map((idx) => {
            return (
              <EmptyDiveSiteContainer key={idx}>
                <Icon
                  color={color("SystemBlue4")}
                  name={"map"}
                  type={IconTypeEnum.MaterialCommunityIcons}
                  size={40}
                />
              </EmptyDiveSiteContainer>
            );
          })}
          {/* {[4, 5].map((idx) => {
            return (
              <PaidDiveSiteContainer key={idx}>
                <Icon
                  color={color("SystemWhite")}
                  name={"cash-lock-open"}
                  type={IconTypeEnum.MaterialCommunityIcons}
                  size={40}
                />
                <PaidDiveSiteTitle numberOfLines={2}>
                  {"Buy To Add More"}
                </PaidDiveSiteTitle>
              </PaidDiveSiteContainer>
            );
          })} */}
        </DiveSitesListContainer>
        <Gap level={1} />
        <Gap level={1} />
      </DiverDetailsFormContainer>
    </ScreenContentsContainer>
  );
};

export default PreferredDiveSites;
