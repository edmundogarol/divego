import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Location } from "@interfaces/CustomTypes";

export interface DirectoryState {
  readonly mapCurrentLocation: Location | undefined;
}

export const initialState: DirectoryState = {
  mapCurrentLocation: undefined,
};

type UpdateMapCurrentLocation = PayloadAction<Location | undefined>;

export type DirectoryAction = UpdateMapCurrentLocation;

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    updateMapCurrentLocation: (state, action: UpdateMapCurrentLocation) => {
      state.mapCurrentLocation = action.payload;
    },
  },
});

export const { updateMapCurrentLocation } = directorySlice.actions;
export const directoryReducer = directorySlice.reducer;

export default directorySlice.reducer;
