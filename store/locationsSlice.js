import { createSlice } from "@reduxjs/toolkit";

import locationsDefaults from "../locations-defaults.json";

let initialState = {
  current: locationsDefaults,
  future: locationsDefaults,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    initLocations: (state) => {
      return { ...state, future: state.current };
    },
    returnToDefaultSettings: (state) => {
      return { ...state, future: locationsDefaults };
      // state = locationsDefaults;
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
      return { ...state, future: state.current };
    },
    saveLocationsToStorage: (state) => {
      return { ...state, current: state.future };
    },
    addNewLocationSlot: (state, action) => {
      state.future.push(action.payload.newLocation);
    },
    deleteLocation: (state, action) => {
      return {
        ...state,
        future: state.future.filter(
          (loc) => loc.id !== action.payload.locationId
        ),
      };
    },
  },
});

const getLocationById = (state, action) => {
  return state.future.find((loc) => loc.id === action.payload.locationId);
};

const getRoleById = (state, action) => {
  let selectedRole;
  for (let i = 0; i < state.future.length; i++) {
    selectedRole = state.future[i].roles.find(
      (r) => r.id === action.payload.roleId
    );
    if (!!selectedRole) break;
  }
  return selectedRole;
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
