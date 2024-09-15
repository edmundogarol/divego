import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@interfaces/CustomTypes";

export interface DirectoryState {
  readonly mapCurrentLocation: Location | undefined;
  readonly active_index: number;
  readonly mapNominateLocation: Location | undefined;
  readonly suggestedNearbyLocation: Location | undefined;
}

export const initialState: DirectoryState = {
  mapCurrentLocation: undefined,
  active_index: 0,
  mapNominateLocation: undefined,
  suggestedNearbyLocation: undefined,
};

type UpdateMapCurrentLocation = PayloadAction<Location | undefined>;
type UpdateMapNominateLocation = PayloadAction<Location | undefined>;
type UpdateSuggestedNearbyLocation = PayloadAction<Location | undefined>;
type UpdateNominateDiveSiteActiveIndex = PayloadAction<number>;

export type DirectoryAction =
  | UpdateMapCurrentLocation
  | UpdateMapNominateLocation
  | UpdateSuggestedNearbyLocation
  | UpdateNominateDiveSiteActiveIndex;

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    updateMapCurrentLocation: (state, action: UpdateMapCurrentLocation) => {
      state.mapCurrentLocation = action.payload;
    },
    updateMapNominateLocation: (state, action: UpdateMapNominateLocation) => {
      state.mapNominateLocation = action.payload;
    },
    updateSuggestedNearbyLocation: (
      state,
      action: UpdateMapNominateLocation,
    ) => {
      state.suggestedNearbyLocation = action.payload;
    },
    updateNominateDiveSiteActiveIndex: (
      state,
      action: UpdateNominateDiveSiteActiveIndex,
    ) => {
      state.active_index = action.payload;
    },
  },
});

export const {
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateSuggestedNearbyLocation,
  updateNominateDiveSiteActiveIndex,
} = directorySlice.actions;
export const directoryReducer = directorySlice.reducer;

export default directorySlice.reducer;
