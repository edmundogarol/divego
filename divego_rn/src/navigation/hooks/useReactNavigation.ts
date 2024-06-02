import {
  NavigationAction,
  NavigationState,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import {
  DrawerActions as RNDrawerActions,
  ParamListBase,
} from "@react-navigation/routers";
import { useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationProp } from "@react-navigation/core/src/types";
import { NativeNavigation, PageEnum } from "@interfaces/NavigationTypes";

export const DrawerActions = RNDrawerActions;

export const useReactNavigation = (): NativeNavigation => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const screenName = useNavigationState(
    (state) => state?.routes[state?.index]?.name,
  );

  return useRef({
    navigate: (page: PageEnum, params?: any): void =>
      navigation.navigate(page, params),
    replace: (page: PageEnum): void =>
      navigation.reset({
        index: 0,
        routes: [{ name: page }],
      }),
    getCurrentPageName: (): PageEnum | null => {
      return screenName as PageEnum;
    },
    getParent: <T = NavigationProp<ParamListBase> | undefined>(): T =>
      navigation.getParent(),
    dispatch: (
      action: NavigationAction | ((state: NavigationState) => NavigationAction),
    ): void => navigation.dispatch(action),
    canGoBack: (): boolean => navigation.canGoBack(),
    goBack: (): void => navigation.goBack(),
    backToFirstScreen: (): void => navigation.popToTop(),
    setOptions: (options: any): void => navigation.setOptions(options),
  }).current;
};

export default useReactNavigation;
