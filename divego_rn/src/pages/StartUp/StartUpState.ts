import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FreediveAgencyEnum,
  Freediver,
  FreediverTypeEnum,
  User,
} from "@interfaces/CustomTypes";
import { StartUpScreensGroup } from "./StartUpInterfaces";

export interface StartUpState {
  readonly active_index: number;
  readonly screens_group: StartUpScreensGroup;
  readonly agency: FreediveAgencyEnum | null;
  readonly certifications_list: Array<Array<string>> | null;
  readonly freediver: Freediver;
}

export const initialState: StartUpState = {
  active_index: 0,
  screens_group: StartUpScreensGroup.Freediver,
  agency: FreediveAgencyEnum.NonCertified,
  freediver: {
    id: undefined,
    user: undefined,
    location: undefined,
    preferred_dive_locations: [],
    freediver_type: FreediverTypeEnum.FUN_DIVER,
    certification: null,
    certification_verified: false,
    image: undefined,
    image_public: undefined,
  },
  certifications_list: null,
};

type UpdateStartUpActiveIndex = PayloadAction<number>;

type UpdateStartUpAgency = PayloadAction<FreediveAgencyEnum | null>;

type UpdateStartUpFreediver = PayloadAction<Freediver>;

type UpdateStartUpScreensGroup = PayloadAction<StartUpScreensGroup>;

type UpdateStartUpDetails = PayloadAction<{
  user: User;
  freediver_type: FreediverTypeEnum;
}>;

type UpdateCertificationsList = PayloadAction<Array<Array<string>>>;

type ResetStartUpFreediver = PayloadAction;

export type StartUpAction =
  | UpdateStartUpActiveIndex
  | UpdateStartUpAgency
  | UpdateStartUpFreediver
  | UpdateStartUpScreensGroup
  | UpdateStartUpDetails
  | UpdateCertificationsList
  | ResetStartUpFreediver;

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
    updateStartUpFreediver: (state, action: UpdateStartUpFreediver) => {
      state.freediver = action.payload;
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
    resetStartUpFreediver: (state) => {
      state.freediver = initialState.freediver;
      state.agency = initialState.agency;
    },
  },
});

export const {
  updateStartUpActiveIndex,
  updateStartUpAgency,
  updateStartUpFreediver,
  updateStartUpScreensGroup,
  updateStartUpDetails,
  updateCertificationsList,
  resetStartUpFreediver,
} = startUpSlice.actions;

export const startUpReducer = startUpSlice.reducer;

export default startUpSlice.reducer;
