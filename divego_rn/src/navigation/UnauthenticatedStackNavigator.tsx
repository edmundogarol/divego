import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
} from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { useCommonHeaderOptions } from "./hooks/useCommonHeaderOptions";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { Else, If } from "@components/If/If";
import { Loading } from "@components/Loading/LoadingStyledComponents";

export const Stack = createStackNavigator<AuthenticatedStackNavigatorParams>();

const UnauthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    const { loading } = useLoginState();
    const headerOptions = useCommonHeaderOptions();

    return (
      <If condition={!loading}>
        <Stack.Navigator initialRouteName={PageEnum.RootNavigator}>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              options={{ headerShown: false }}
              name={PageEnum.Login}
              component={Login}
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
        <Else>
          <Loading size="large" color="black" scale={1.5} />
        </Else>
      </If>
    );
  };

export default UnauthenticatedStackNavigator;
