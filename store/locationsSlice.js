import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationsDefaults from "../locations-defaults.json";
import { STORE_ACTIVE_LOCATIONS } from "../constants/globalConstants";

let initialState = locationsDefaults;

export const locationsSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    initLocations: (state, action) => {
      return action.payload.storedLocations;
    },
    returnToDefaultSettings: (state) => {
      return locationsDefaults;
    },
    toggleLocationStatus: (state, action) => {
      const location = getLocationById(state, action);
      location.enabled = !location.enabled;
    },
    changeLocationName: (state, action) => {
      const location = getLocationById(state, action);
      location.locationName = action.payload.locationName;
    },
    toggleAllRolesStatusForOneLocation: (state, action) => {
      const location = getLocationById(state, action);
      location.roles.forEach((role) => {
        role.enabled = action.payload.status;
      });
    },
    toggleRoleStatus: (state, action) => {
      const role = getRoleById(state, action);
      role.enabled = !role.enabled;
    },
    changeRoleName: (state, action) => {
      const role = getRoleById(state, action);
      role.roleName = action.payload.roleName;
    },
    cancelChanges: (state) => {
      state = initialState;
    },
    saveLocationsToStorage: (state) => {
      saveLocations(state);
    },
    addNewLocationSlot: (state, action) => {
      state.push(action.payload.newLocation);
    },
    deleteLocation: (state, action) => {
      return state.filter((loc) => loc.id !== action.payload.locationId);
    },
  },
});

const getLocationById = (state, action) => {
  return state.find((loc) => loc.id === action.payload.locationId);
};

const getRoleById = (state, action) => {
  let selectedRole;
  for (let i = 0; i < state.length; i++) {
    selectedRole = state[i].roles.find((r) => r.id === action.payload.roleId);
    if (!!selectedRole) break;
  }
  return selectedRole;
};

const saveLocations = async (state) => {
  try {
    const activeLocations = JSON.stringify(state);
    await AsyncStorage.setItem(STORE_ACTIVE_LOCATIONS, activeLocations);
  } catch (err) {
    console.log(err);
  }
};

export const {
  toggleLocationStatus,
  changeLocationName,
  toggleAllRolesStatusForOneLocation,
  toggleRoleStatus,
  changeRoleName,
  cancelChanges,
  saveLocationsToStorage,
  initLocations,
  returnToDefaultSettings,
  addNewLocationSlot,
  deleteLocation,
} = locationsSlice.actions;
export default locationsSlice.reducer;
