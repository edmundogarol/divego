import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Else, If } from "@components/If/If";
import useLoginState from "@pages/Login/hooks/useLoginState";
import AuthenticatedStackNavigator from "./AuthenticatedStackNavigator";
import { linking } from "./linking";
import UnauthenticatedStackNavigator from "./UnauthenticatedStackNavigator";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user } = useLoginState();
  return (
    <NavigationContainer linking={linking}>
      <If condition={user?.logged_in}>
        <AuthenticatedStackNavigator />
        <Else>
          <UnauthenticatedStackNavigator />
        </Else>
      </If>
    </NavigationContainer>
  );
};
export default AppNavigation;
