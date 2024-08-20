import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@interfaces/CustomTypes";

export interface DirectoryState {
  readonly mapCurrentLocation: Location | undefined;
  readonly mapNominateLocation: Location | undefined;
}

export const initialState: DirectoryState = {
  mapCurrentLocation: undefined,
  mapNominateLocation: undefined,
};

type UpdateMapCurrentLocation = PayloadAction<Location | undefined>;
type UpdateMapNominateLocation = PayloadAction<Location | undefined>;

export type DirectoryAction =
  | UpdateMapCurrentLocation
  | UpdateMapNominateLocation;

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
  },
});

export const { updateMapCurrentLocation, updateMapNominateLocation } =
  directorySlice.actions;
export const directoryReducer = directorySlice.reducer;

export default directorySlice.reducer;
