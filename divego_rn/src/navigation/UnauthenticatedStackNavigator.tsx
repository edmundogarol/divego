import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthenticatedStackNavigatorParams,
  PageEnum,
  UnauthenticatedStackNavigatorParams,
} from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import SignUp from "@pages/SignUp/SignUp";
import { useCommonHeaderOptions } from "./hooks/useCommonHeaderOptions";
import ResetPassword from "@pages/ResetPassword/ResetPassword";
import { Else, If } from "@components/If/If";
import { Loading } from "@components/Loading/LoadingStyledComponents";
import useLoginCheckHandler from "@pages/Login/hooks/useLoginCheckHandler";
import useLoginCheckApiCall from "@pages/Login/hooks/useLoginCheckApiCall";

export const Stack =
  createStackNavigator<UnauthenticatedStackNavigatorParams>();

const UnauthenticatedStackNavigator: React.FunctionComponent =
  (): React.ReactElement => {
    const headerOptions = useCommonHeaderOptions();
    const loginCheckApiCall = useLoginCheckApiCall();
    const { loading } = loginCheckApiCall;
    useLoginCheckHandler(loginCheckApiCall);

    return (
      <If condition={!loading}>
        <Stack.Navigator initialRouteName={PageEnum.Login}>
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
