import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import DrawerNavigator from "./DrawerNavigator/DrawerNavigator";
import StartUp from "@pages/StartUp/StartUp";
import useStartUpState from "@pages/StartUp/hooks/useStartUpState";
import { useCommonHeaderOptions } from "./hooks/useCommonHeaderOptions";
import FreediveDirectoryModal from "@pages/Directory/FreediveDirectoryModal/FreediveDirectoryModal";
import ChangeCurrentLocation from "@pages/Directory/ChangeCurrentLocation";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const AuthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    const headerOptions = useCommonHeaderOptions();
    const { active_index } = useStartUpState();

    return (
      <Stack.Navigator initialRouteName={PageEnum.Dashboard}>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={PageEnum.RootNavigator}
            component={DrawerNavigator}
          />
          <Stack.Screen
            options={{
              ...headerOptions,
              gestureEnabled: active_index.toString() === "0",
            }}
            name={PageEnum.StartUp}
            component={StartUp}
          />
          <Stack.Screen
            options={{
              ...headerOptions,
            }}
            name={PageEnum.FreediveDirectoryModal}
            component={FreediveDirectoryModal}
          />
          <Stack.Screen
            options={{
              ...headerOptions,
            }}
            name={PageEnum.ChangeCurrentLocation}
            component={ChangeCurrentLocation}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  };

export default AuthenticatedStackNavigator;
