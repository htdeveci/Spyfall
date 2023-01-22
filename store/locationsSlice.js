import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationsDefaults from "../locations-defaults.json";

let initialState;

export const getLocations = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("activeLocations");
    console.log(jsonValue);
    initialState =
      jsonValue == null ? locationsDefaults : JSON.parse(jsonValue);
    // return initialState;
  } catch (err) {
    console.log(err);
  }
};

const saveLocations = async (state) => {
  try {
    const activeLocations = JSON.stringify(state);
    await AsyncStorage.setItem("activeLocations", activeLocations);
  } catch (err) {
    console.log(err);
  }
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState: locationsDefaults,
  reducers: {
    initLocations: (state, action) => {
      console.log(JSON.stringify(initialState));
      state = JSON.stringify(initialState);
    },
    toggleLocationStatus: (state, action) => {
      const location = state[action.payload.index];
      location.enabled = !location.enabled;
    },
    changeLocationName: (state, action) => {
      const location = state[action.payload.index];
      location.locationName = action.payload.locationName;
    },
    toggleAllRolesStatusForOneLocation: (state, action) => {
      const location = state[action.payload.index];
      location.roles.forEach((role) => {
        role.enabled = action.payload.status;
      });
    },
    toggleRoleStatus: (state, action) => {
      const location = state[action.payload.locationIndex];
      const role = location.roles[action.payload.roleIndex];
      role.enabled = !role.enabled;
    },
    changeRoleName: (state, action) => {
      const location = state[action.payload.locationIndex];
      const role = location.roles[action.payload.roleIndex];
      role.roleName = action.payload.roleName;
    },
    cancelChanges: () => {
      return initialState;
    },
    saveLocationsToStorage: (state) => {
      saveLocations(state);
    },
  },
});

// const getLocationById = (state, id) => {
//   return state.find((location) => location.id === id);
// };

// const getRoleById = (location, id) => {
//   return location.roles.find((role) => role.id === id);
// };

export const {
  toggleLocationStatus,
  changeLocationName,
  toggleAllRolesStatusForOneLocation,
  toggleRoleStatus,
  changeRoleName,
  cancelChanges,
  saveLocationsToStorage,
  initLocations,
} = locationsSlice.actions;
export default locationsSlice.reducer;
