import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "@pages/Login/LoginState";
import { startUpReducer } from "@pages/StartUp/StartUpState";
import { directoryReducer } from "@pages/Directory/DirectoryState";

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: ["directory/updateNearbyLocations"],
    ignoredPaths: ["directory.nearbyLocations"],
  },
};

export default configureStore({
  reducer: {
    login: loginReducer,
    startUp: startUpReducer,
    directory: directoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
