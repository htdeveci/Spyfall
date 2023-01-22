import { createSlice } from "@reduxjs/toolkit";

import locationsDefaults from "../locations-defaults.json";

//  const initialState = {locations : locationsDefaults, expandRoles:false, }

export const locationsSlice = createSlice({
  name: "locations",
  initialState: locationsDefaults,
  reducers: {
    toggleLocationStatus: (state, action) => {
      // const location = getLocationById(state, action.payload.id);
      const location = state[action.payload.index];
      location.enabled = !location.enabled;
    },
    changeLocationName: (state, action) => {
      // const location = getLocationById(state, action.payload.id);
      const location = state[action.payload.index];
      location.locationName = action.payload.locationName;
    },
    toggleAllRolesStatusForOneLocation: (state, action) => {
      // const location = getLocationById(state, action.payload.id);
      const location = state[action.payload.index];
      location.roles.forEach((role) => {
        role.enabled = action.payload.status;
      });
    },
    toggleRoleStatus: (state, action) => {
      // const location = getLocationById(state, action.payload.locationId);
      const location = state[action.payload.locationIndex];
      // const role = getRoleById(location, action.payload.roleId);
      const role = location.roles[action.payload.roleIndex];
      role.enabled = !role.enabled;
    },
    changeRoleName: (state, action) => {
      // const location = getLocationById(state, action.payload.locationId);
      const location = state[action.payload.locationIndex];
      // const role = getRoleById(location, action.payload.roleId);
      const role = location.roles[action.payload.roleIndex];
      role.roleName = action.payload.roleName;
    },
    cancelChanges: (state) => {
      console.log(locationsDefaults);
      console.log(state);
      state = locationsDefaults;
    },
    saveLocationsToFile: (state) => {
      console.log(state);
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
  saveLocationsToFile,
} = locationsSlice.actions;
export default locationsSlice.reducer;
