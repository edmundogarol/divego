import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import { PageEnum } from "@interfaces/NavigationTypes";
import Login from "@pages/Login/Login";
import { IconTypeEnum } from "@components/Icon/IconInterfaces";
import {
  LeftDrawerMenuButtonContainer,
  MenuIcon,
} from "./DrawerNavigatorStyledComponents";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import useLoginState from "@pages/Login/hooks/useLoginState";
import { If } from "@components/If/If";
import useLogout from "@pages/Login/hooks/useLogout";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation();
  const { user } = useLoginState();
  const logout = useLogout();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <If condition={user?.logged_in}>
        <DrawerItem
          label="Logout"
          onPress={() =>
            Alert.alert("Warning", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                onPress: (): void =>
                  navigation.dispatch(DrawerActions.closeDrawer()),
              },
              {
                text: "Logout",
                onPress: (): void => logout(),
              },
            ])
          }
        />
      </If>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator: React.FunctionComponent = (): React.ReactElement => {
  const navigation = useNavigation();
  const { user } = useLoginState();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName={PageEnum.Login}
      screenOptions={{
        headerShown: user.logged_in,
        header: () => (
          <LeftDrawerMenuButtonContainer
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MenuIcon name="menu" type={IconTypeEnum.Ionicons} />
          </LeftDrawerMenuButtonContainer>
        ),
      }}
      useLegacyImplementation={false}>
      <Drawer.Screen name={PageEnum.Login} component={Login} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
