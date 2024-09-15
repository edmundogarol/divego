import { ScreenProps } from "@pages/StartUp/hooks/useRoleScreens";
import NominateDiveSiteMap from "../NominateDiveSite/screens/NominateDiveSiteMap";
import NominateDiveSiteDetailsForm from "../NominateDiveSite/screens/NominateDiveSiteDetailsForm";

const useNominateDiveSiteScreens = (): ScreenProps[] => {
  return [
    {
      key: "0",
      component: NominateDiveSiteMap,
    },
    {
      key: "1",
      component: NominateDiveSiteDetailsForm,
    },
  ];
};

export default useNominateDiveSiteScreens;
