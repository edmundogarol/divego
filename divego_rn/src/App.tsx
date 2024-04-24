import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import store from "./redux/store";

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default App;
