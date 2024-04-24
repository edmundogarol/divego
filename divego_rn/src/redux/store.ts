import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "@pages/Login/LoginState";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
