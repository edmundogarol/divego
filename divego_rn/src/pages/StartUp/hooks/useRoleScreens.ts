import { useCallback } from "react";
import StartUp1FreediverDetails from "../screens/Freediving/Diver/StartUp1FreediverDetails";
import StartUp1FreediveInstructorDetails from "../screens/Freediving/Instructor/StartUp1FreediveInstructorDetails";
import StartUp1ScubaDiverDetails from "../screens/Scuba/Diver/StartUp1ScubaDiverDetails";
import StartUp0ChooseRole from "../screens/StartUp0ChooseRole";
import useStartUpState from "./useStartUpState";
import StartUp2ContactDetails from "../screens/Freediving/common/StartUp2ContactDetails";
import StartUp3PreferredDiveLocations from "../screens/Freediving/common/StartUp3PreferredDiveLocations";

export interface ScreenProps {
  key: string;
  component: React.FunctionComponent<ScreenRenderProps>;
}

export interface ScreenRenderProps {
  screenKey: string;
  gotoNextPage: () => void;
  gotoPrevPage: () => void;
}

const freediverScreens = [
  {
    key: "0",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    component: StartUp1FreediverDetails,
  },
  {
    key: "2",
    component: StartUp2ContactDetails,
  },
  {
    key: "3",
    component: StartUp3PreferredDiveLocations,
  },
];

const scubaDiverScreens = [
  {
    key: "0",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    component: StartUp1ScubaDiverDetails,
  },
];

const freediveInstructorScreens = [
  {
    key: "0",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    component: StartUp1FreediveInstructorDetails,
  },
];

const useRoleScreens = (): (() => { [key: string]: ScreenProps[] }) => {
  const { agency } = useStartUpState();
  return useCallback(
    () => ({
      freediver: freediverScreens,
      scubaDiver: scubaDiverScreens,
      freediveInstructor: freediveInstructorScreens,
    }),
    [agency],
  );
};

export default useRoleScreens;
