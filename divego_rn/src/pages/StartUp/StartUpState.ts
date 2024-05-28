import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FreediveAgencyEnum,
  FreediverType,
  User,
} from "@interfaces/CustomTypes";
import { StartUpScreensGroup } from "./StartUpInterfaces";

export interface StartUpState {
  readonly active_index: number;
  readonly screens_group: StartUpScreensGroup;
  readonly agency?: FreediveAgencyEnum | null;
  readonly user: User;
  readonly freediver_type: FreediverType | null;
  readonly certifications_list: Array<Array<string>> | null;
}

export const initialState: StartUpState = {
  active_index: 0,
  screens_group: StartUpScreensGroup.Freediver,
  agency: null,
  user: {
    id: undefined,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    bio: "",
    location: "",
    birth_date: "",
    logged_in: false,
    is_staff: false,
    verified: false,
    active_role: null,
    diver_type: null,
  },
  freediver_type: null,
  certifications_list: null,
};

type UpdateStartUpActiveIndex = PayloadAction<number>;

type UpdateStartUpAgency = PayloadAction<FreediveAgencyEnum | null>;

type UpdateStartUpScreensGroup = PayloadAction<StartUpScreensGroup>;

type UpdateStartUpDetails = PayloadAction<{
  user: User;
  freediver_type: FreediverType;
}>;

type UpdateCertificationsList = PayloadAction<Array<Array<string>>>;

export type StartUpAction =
  | UpdateStartUpActiveIndex
  | UpdateStartUpAgency
  | UpdateStartUpScreensGroup
  | UpdateStartUpDetails
  | UpdateCertificationsList;

export const startUpSlice = createSlice({
  name: "startUp",
  initialState,
  reducers: {
    updateStartUpActiveIndex: (state, action: UpdateStartUpActiveIndex) => {
      state.active_index = action.payload;
    },
    updateStartUpAgency: (state, action: UpdateStartUpAgency) => {
      state.agency = action.payload;
    },
    updateStartUpScreensGroup: (state, action: UpdateStartUpScreensGroup) => {
      state.screens_group = action.payload;
    },
    updateStartUpDetails: (state, action: UpdateStartUpDetails) => {
      state = { ...state, ...action.payload };
    },
    updateCertificationsList: (state, action: UpdateCertificationsList) => {
      state.certifications_list = action.payload;
    },
  },
});

export const {
  updateStartUpActiveIndex,
  updateStartUpAgency,
  updateStartUpScreensGroup,
  updateStartUpDetails,
  updateCertificationsList,
} = startUpSlice.actions;

export const startUpReducer = startUpSlice.reducer;

export default startUpSlice.reducer;
