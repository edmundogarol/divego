import { ScreenProps } from "@pages/StartUp/hooks/useRoleScreens";
import NominateDiveSiteMap from "../NominateDiveSite/screens/NominateDiveSiteMap";

const useNominateDiveSiteScreens = (): ScreenProps[] => {
  return [
    {
      key: "0",
      component: NominateDiveSiteMap,
    },
  ];
};

export default useNominateDiveSiteScreens;
