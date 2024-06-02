import { useCallback } from "react";
import StartUp1FreediverDetails from "../screens/Freediving/Diver/StartUp1FreediverDetails";
import StartUp1FreediveInstructorDetails from "../screens/Freediving/Instructor/StartUp1FreediveInstructorDetails";
import StartUp1ScubaDiverDetails from "../screens/Scuba/Diver/StartUp1ScubaDiverDetails";
import StartUp0ChooseRole from "../screens/StartUp0ChooseRole";
import useStartUpState from "./useStartUpState";
import StartUp2ContactDetails from "../screens/Freediving/common/StartUp2ContactDetails";

export interface ScreenProps {
  key: string;
  title: string;
  component: React.FunctionComponent<{
    gotoNextPage: () => void;
    gotoPrevPage: () => void;
  }>;
}

const freediverScreens = [
  {
    key: "0",
    title: "Choose Role",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    title: "Diver Details",
    component: StartUp1FreediverDetails,
  },
  {
    key: "2",
    title: "Contact Details",
    component: StartUp2ContactDetails,
  },
];

const scubaDiverScreens = [
  {
    key: "0",
    title: "Choose Role",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    title: "Scuba Diver Details",
    component: StartUp1ScubaDiverDetails,
  },
];

const freediveInstructorScreens = [
  {
    key: "0",
    title: "Choose Role",
    component: StartUp0ChooseRole,
  },
  {
    key: "1",
    title: "Freedive Instructor Details",
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
