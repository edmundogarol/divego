import { LoginState } from "@pages/Login/LoginState";
import { StartUpState } from "@pages/StartUp/StartUpState";

export interface StoreState {
  login: LoginState;
  startUp: StartUpState;
}
