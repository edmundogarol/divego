import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import store from "./redux/store";
import { SafeAreaView } from "react-native";
import globalStyles from "@styles/global";

const App = (): React.ReactElement => {
  const styles = globalStyles();

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Login />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
