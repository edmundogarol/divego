import {
  AddDiveSiteContainer,
  AddDiveSiteTitle,
  DiveSitesListContainer,
  DiverDetailsFormContainer,
  EmptyDiveSiteContainer,
  PaidDiveSiteContainer,
  PaidDiveSiteTitle,
  ScreenContentsContainer,
} from "@pages/StartUp/StartUpStyledComponents";
import Gap from "@components/Gap/Gap";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import useLoginDispatch from "@pages/Login/hooks/useLoginDispatch";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";
import { Text } from "react-native";
import Input from "@components/Input/Input";
import useRenderInputIcon from "@components/Input/hooks/useRenderInputIcon";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import Icon from "@components/Icon/Icon";
import { color } from "@styles/colors";
import { If } from "@components/If/If";
import { useState } from "react";
import useReactNavigation from "@navigation/hooks/useReactNavigation";
import { PageEnum } from "@interfaces/NavigationTypes";

const StartUp3PreferredDiveLocations: React.FunctionComponent<
  ScreenRenderProps
> = ({ screenKey, gotoPrevPage, gotoNextPage }) => {
  const navigation = useReactNavigation();
  const [searching, toggleSearching] = useState(false);
  const { user } = useLoginState();
  const { updateUser } = useLoginDispatch();
  const { active_index, freediver } = useStartUpState();
  const renderInputIcon = useRenderInputIcon();

  useCustomScreenOptions({
    title: <Text numberOfLines={2}>{"Preferred Dive Locations"}</Text>,
    backButtonOnPress: () => gotoPrevPage(),
    rightButtonOnPress: () => console.log({ user, freediver }),
    rightButtonDisabled: user.locations.length < 1,
    rightButtonText: "Next",
    depList: [active_index],
    loadCondition: active_index.toString() === screenKey,
  });

  return (
    <ScreenContentsContainer>
      <DiverDetailsFormContainer>
        <If condition={searching}>
          <Gap level={1} />
          <Input
            placeholder="Enter Dive Site Location"
            icon={renderInputIcon("search", IconTypeEnum.FontAwesome, false)}
            googleAutoComplete
          />
        </If>
        <DiveSitesListContainer>
          <AddDiveSiteContainer
            onPress={() =>
              navigation.navigate(PageEnum.FreediveDirectoryModal)
            }>
            <Icon
              color={color("SystemWhite")}
              name={"map-plus"}
              type={IconTypeEnum.MaterialCommunityIcons}
              size={70}
            />
            <AddDiveSiteTitle>{"Add Dive Site"}</AddDiveSiteTitle>
          </AddDiveSiteContainer>
          {[1, 2, 3].map((idx) => {
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

export default StartUp3PreferredDiveLocations;
