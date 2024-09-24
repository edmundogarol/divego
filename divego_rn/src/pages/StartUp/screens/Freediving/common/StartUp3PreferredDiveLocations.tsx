import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import useCustomScreenOptions from "@navigation/hooks/useCustomScreenOptions";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { ScreenRenderProps } from "@pages/StartUp/hooks/useRoleScreens";
import { Text } from "react-native";
import PreferredDiveSites from "@pages/PreferredDiveSites/PreferredDiveSites";
import { PageEnum } from "@interfaces/NavigationTypes";
import useStartUpDispatch from "@pages/StartUp/hooks/useStartUpDispatch";

const StartUp3PreferredDiveLocations: React.FunctionComponent<
  ScreenRenderProps
> = ({ screenKey, gotoPrevPage, gotoNextPage }) => {
  const { user } = useLoginState();
  const { active_index, freediver, preferredDiveSites } = useStartUpState();
  const { updatePreferredDiveSites } = useStartUpDispatch();

  useCustomScreenOptions({
    title: <Text numberOfLines={2}>{"Preferred Dive Locations"}</Text>,
    backButtonOnPress: () => gotoPrevPage(),
    rightButtonOnPress: () => console.log({ user, freediver }),
    rightButtonText: user.locations.length < 1 ? "Skip" : "Next",
    depList: [active_index, preferredDiveSites],
    loadCondition: active_index.toString() === screenKey,
  });

  return (
    <PreferredDiveSites
      preferredDiveSites={preferredDiveSites}
      updatePreferredDiveSites={updatePreferredDiveSites}
      directoryPage={PageEnum.StartUpDirectory}
    />
  );
};

export default StartUp3PreferredDiveLocations;
