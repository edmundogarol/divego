import { PageEnum } from "@interfaces/NavigationTypes";
import SignUp from "@pages/SignUp/SignUp";

export const linking = {
  // Prefixes accepted by the navigation container, should match the added schemes
  prefixes: ["divego://"],
  // Route config to map uri paths to screens
  config: {
    // Initial route name to be added to the stack before any further navigation,
    // should match one of the available screens
    initialRouteName: PageEnum.Login as const,
    screens: {
      Login: PageEnum.Login,
      SignUp: PageEnum.SignUp,
      ResetPassword: PageEnum.ResetPassword,
    },
  },
};
