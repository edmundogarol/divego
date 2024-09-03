import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@interfaces/CustomTypes";

export interface DirectoryState {
  readonly mapCurrentLocation: Location | undefined;
  readonly mapNominateLocation: Location | undefined;
  readonly suggestedNearbyLocation: Location | undefined;
}

export const initialState: DirectoryState = {
  mapCurrentLocation: undefined,
  mapNominateLocation: undefined,
  suggestedNearbyLocation: undefined,
};

type UpdateMapCurrentLocation = PayloadAction<Location | undefined>;
type UpdateMapNominateLocation = PayloadAction<Location | undefined>;
type UpdateSuggestedNearbyLocation = PayloadAction<Location | undefined>;

export type DirectoryAction =
  | UpdateMapCurrentLocation
  | UpdateMapNominateLocation
  | UpdateSuggestedNearbyLocation;

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
  },
});

export const {
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateSuggestedNearbyLocation,
} = directorySlice.actions;
export const directoryReducer = directorySlice.reducer;

export default directorySlice.reducer;
