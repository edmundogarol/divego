import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import DrawerNavigator from "./DrawerNavigator/DrawerNavigator";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const AuthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    return (
      <Stack.Navigator initialRouteName={PageEnum.RootNavigator}>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={PageEnum.RootNavigator}
            component={DrawerNavigator}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AuthenticatedStackNavigator;
