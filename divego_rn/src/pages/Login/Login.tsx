import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import DivegoLogo from "@assets/divego_logo_transparent_non_vector.svg";
import useLoginState from "./hooks/useLoginState";
import useLoginDispatch from "./hooks/useLoginDispatch";

const Login: React.FunctionComponent = () => {
  const { loading } = useLoginState();
  const { updateLoading } = useLoginDispatch();
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <DivegoLogo width={200} height={200} />
          <Text>{loading ? "Loading" : "Not Loading"}</Text>
          <Button
            title="Update Loading"
            onPress={() => updateLoading(!loading)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
