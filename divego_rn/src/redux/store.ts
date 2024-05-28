import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "@pages/Login/LoginState";
import { startUpReducer } from "@pages/StartUp/StartUpState";

export default configureStore({
  reducer: {
    login: loginReducer,
    startUp: startUpReducer,
  },
});
