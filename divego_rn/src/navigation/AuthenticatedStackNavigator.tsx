import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { useCommonHeaderOptions } from "./hooks/useCommonHeaderOptions";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import LeftMenuDrawer from "./LeftDrawer/LeftDrawer";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const AuthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    const headerOptions = useCommonHeaderOptions();

    return (
      <Stack.Navigator initialRouteName={PageEnum.RootNavigator}>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={PageEnum.RootNavigator}
            component={LeftMenuDrawer}
          />
          <Stack.Screen
            name={PageEnum.SignUp}
            component={SignUp}
            options={{ ...headerOptions }}
          />
          <Stack.Screen
            name={PageEnum.ResetPassword}
            component={ResetPassword}
            options={{ ...headerOptions }}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AuthenticatedStackNavigator;
