import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@interfaces/CustomTypes";

export interface LoginState {
  readonly loading: boolean;
  readonly user?: User;
}

const initialState: LoginState = {
  loading: false,
  user: {
    id: 1,
    first_name: "Yung",
    last_name: "Garol",
    username: "yunggarol",
    email: "yung.garol@email.com",
    verified: false,
    logged_in: false,
    is_staff: false,
  },
};

type UpdateLoadingAction = PayloadAction<boolean>;

export type LoginAction = UpdateLoadingAction;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLoading } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;
