import {
  NavigationAction,
  NavigationProp,
  NavigationState,
  ParamListBase,
} from "@react-navigation/native";

export enum PageEnum {
  RootNavigator = "RootNavigator",
  Login = "Login",
  SignUp = "SignUp",
}

export type AuthenticatedStackNavigatorParams = {
  [PageEnum.RootNavigator]: undefined;
  [PageEnum.Login]: undefined;
  [PageEnum.SignUp]: undefined;
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
  setOptions?: (options: any) => void;
  canGoBack: () => boolean;
}
