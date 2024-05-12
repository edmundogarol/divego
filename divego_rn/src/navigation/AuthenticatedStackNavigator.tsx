import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import DrawerNavigator from "./DrawerNavigator/DrawerNavigator";
import StartUp from "@pages/StartUp/StartUp";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const AuthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    return (
      <Stack.Navigator initialRouteName={PageEnum.Dashboard}>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={PageEnum.RootNavigator}
            component={DrawerNavigator}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={PageEnum.StartUp}
            component={StartUp}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AuthenticatedStackNavigator;
