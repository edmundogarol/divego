import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { useCommonHeaderOptions } from "./hooks/useCommonHeaderOptions.native";
import ResetPassword from "@pages/ResetPassword/ResetPassword";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const AuthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    const headerOptions = useCommonHeaderOptions();

    return (
      <Stack.Navigator initialRouteName={PageEnum.RootNavigator}>
        <Stack.Group>
          <Stack.Screen
            name={PageEnum.Login}
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
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
