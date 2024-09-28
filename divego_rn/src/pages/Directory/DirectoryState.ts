import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Location,
  LocationsNearby,
  LocationsNearbyMapped,
} from "@interfaces/CustomTypes";
import mockDirectoryItems from "./mocks/mockDirectoryItems";

export interface DirectoryState {
  readonly mapCurrentLocation?: Location;
  readonly active_index: number;
  readonly mapNominateLocation?: Location;
  readonly nearbyLocations: LocationsNearbyMapped;
  readonly suggestedNearbyLocation?: Location;
  readonly diveSiteAmenityChoices: { [key: string]: boolean };
}

export const initialState: DirectoryState = {
  mapCurrentLocation: undefined,
  active_index: 0,
  mapNominateLocation: undefined,
  suggestedNearbyLocation: undefined,
  nearbyLocations: mockDirectoryItems,
  diveSiteAmenityChoices: {
    toilet: false,
    showers: false,
    food: false,
    gym: false,
    fee: false,
  },
};

type UpdateMapCurrentLocation = PayloadAction<Location | undefined>;
type UpdateMapNominateLocation = PayloadAction<Location | undefined>;
type UpdateSuggestedNearbyLocation = PayloadAction<Location | undefined>;
type UpdateNominateDiveSiteActiveIndex = PayloadAction<number>;
type UpdateDiveSiteActiveAmenities = PayloadAction<string>;
type UpdateNearbyLocations = PayloadAction<LocationsNearbyMapped>;

export type DirectoryAction =
  | UpdateMapCurrentLocation
  | UpdateMapNominateLocation
  | UpdateSuggestedNearbyLocation
  | UpdateNominateDiveSiteActiveIndex
  | UpdateDiveSiteActiveAmenities
  | UpdateNearbyLocations;

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
    updateDiveSiteActiveAmenities: (
      state,
      action: UpdateDiveSiteActiveAmenities,
    ) => {
      state.diveSiteAmenityChoices = {
        ...state.diveSiteAmenityChoices,
        [action.payload]: !state.diveSiteAmenityChoices[action.payload],
      };
    },
    updateNearbyLocations: (state, action) => {
      state.nearbyLocations = action.payload;
    },
  },
});

export const {
  updateMapCurrentLocation,
  updateMapNominateLocation,
  updateSuggestedNearbyLocation,
  updateNominateDiveSiteActiveIndex,
  updateDiveSiteActiveAmenities,
  updateNearbyLocations,
} = directorySlice.actions;
export const directoryReducer = directorySlice.reducer;

export default directorySlice.reducer;
