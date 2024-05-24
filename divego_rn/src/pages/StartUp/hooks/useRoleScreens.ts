import StartUp2FreediverDetails from "../screens/Freediving/Diver/StartUp2FreediverDetails";
import StartUp2FreediveInstructorDetails from "../screens/Freediving/Instructor/StartUp2FreediveInstructorDetails";
import StartUp2ScubaDiverDetails from "../screens/Scuba/Diver/StartUp2ScubaDiverDetails";
import StartUp1ChooseRole from "../screens/StartUp1ChooseRole";

export interface ScreenProps {
  key: string;
  title: string;
  component: React.FunctionComponent<{
    gotoNextPage: (screen: string) => void;
    gotoPrevPage: () => void;
  }>;
}

const freediverScreens = [
  {
    key: "1",
    title: "Choose Role",
    component: StartUp1ChooseRole,
  },
  {
    key: "2",
    title: "Diver Details",
    component: StartUp2FreediverDetails,
  },
];

const scubaDiverScreens = [
  {
    key: "1",
    title: "Choose Role",
    component: StartUp1ChooseRole,
  },
  {
    key: "2",
    title: "Scuba Diver Details",
    component: StartUp2ScubaDiverDetails,
  },
];

const freediveInstructorScreens = [
  {
    key: "1",
    title: "Choose Role",
    component: StartUp1ChooseRole,
  },
  {
    key: "2",
    title: "Freedive Instructor Details",
    component: StartUp2FreediveInstructorDetails,
  },
];

const useRoleScreens = (): { [key: string]: ScreenProps[] } => {
  return {
    freediver: freediverScreens,
    scubaDiver: scubaDiverScreens,
    freediveInstructor: freediveInstructorScreens,
  };
};

export default useRoleScreens;
