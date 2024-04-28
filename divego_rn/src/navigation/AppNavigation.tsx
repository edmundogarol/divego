import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Else, If } from "@components/If/If";
import useLoginState from "@pages/Login/hooks/useLoginState";
import AuthenticatedStackNavigator from "./AuthenticatedStackNavigator";

const AppNavigation: React.FunctionComponent = (): React.ReactElement => {
  const { user } = useLoginState();
  return (
    <NavigationContainer>
      <If condition={!user?.logged_in}>
        <AuthenticatedStackNavigator />
        <Else>{/* <UnauthenticatedStackNavigator /> */}</Else>
      </If>
    </NavigationContainer>
  );
};
export default AppNavigation;
