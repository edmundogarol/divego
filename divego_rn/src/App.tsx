import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import globalStyles from "@styles/global";
import Login from "./pages/Login/Login";
import store from "./redux/store";
import AppNavigation from "./navigation/AppNavigation";

const App = (): React.ReactElement => {
  const styles = globalStyles();

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
