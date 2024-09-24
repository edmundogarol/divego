import {
  NavigationAction,
  NavigationProp,
  NavigationState,
  ParamListBase,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum PageEnum {
  RootNavigator = "RootNavigator",
  DrawerNavigator = "DrawerNavigator",
  BottomTabNavigator = "BottomTabNavigator",
  Login = "Login",
  SignUp = "SignUp",
  ResetPassword = "ResetPassword",
  Dashboard = "Dashboard",
  StartUp = "Start Up",
  StartUpDirectory = "StartUpDirectory",
  ChangeCurrentLocation = "ChangeCurrentLocation",
  NominateDiveSite = "NominateDiveSite",
}

export type AuthenticatedStackNavigatorParams = {
  [PageEnum.RootNavigator]: undefined;
  [PageEnum.DrawerNavigator]: undefined;
  [PageEnum.Dashboard]: undefined;
  [PageEnum.StartUp]: undefined;
  [PageEnum.StartUpDirectory]: undefined;
  [PageEnum.ChangeCurrentLocation]: undefined;
  [PageEnum.NominateDiveSite]: undefined;
};

export type UnauthenticatedStackNavigatorParams = {
  [PageEnum.Login]: undefined;
  [PageEnum.SignUp]: undefined;
  [PageEnum.ResetPassword]: undefined;
};

export interface Navigation {
  navigate: (page: PageEnum, params?: any) => void;
  replace: (page: PageEnum) => void;
  goBack: () => void;
  getCurrentPageName: () => PageEnum | null;
}

export interface NativeNavigation extends Navigation {
  getParent: <T = NavigationProp<ParamListBase> | undefined>() => T;
  dispatch?: (
    action: NavigationAction | ((state: NavigationState) => NavigationAction),
  ) => void;
  backToFirstScreen?: () => void;
  isFocused?: () => boolean;
  setOptions: (options: any) => void;
  canGoBack: () => boolean;
  self: () => StackNavigationProp<ParamListBase>;
}
