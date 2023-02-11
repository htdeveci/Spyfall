import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

import locationsDefaults from "../assets/locations-defaults.json";

let initialState = {
  current: locationsDefaults,
  future: locationsDefaults,
  enableRoles: true,
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
    },
    toggleGameRolesStatus: (state) => {
      state.enableRoles = !state.enableRoles;
    },
    toggleLocationGroupStatus: (state, action) => {
      const locationGroup = state.future.find(
        (locGroup) => locGroup.id === action.payload.locationGroupId
      );
      locationGroup.enabled = action.payload.status
        ? action.payload.status
        : !locationGroup.enabled;
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
    addNewLocationSlot: (state) => {
      let customGroup = state.future.find(
        (locGroup) => locGroup.title === "Özel"
      );

      if (!customGroup) {
        customGroup = {
          title: "Özel",
          id: uuidv1(),
          enabled: true,
          data: [],
        };

        state.future.push(customGroup);
      }

      customGroup.data.push({
        locationName: "",
        id: uuidv1(),
        enabled: true,
        roles: [
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
          { enabled: true, roleName: "", id: uuidv1() },
        ],
      });
    },
    deleteLocation: (state, action) => {
      const locationGroup = state.future.find(
        (locGroup) => locGroup.id === action.payload.locationGroupId
      );
      const data = locationGroup.data.filter(
        (loc) => loc.id !== action.payload.locationId
      );
      locationGroup.data = data;

      if (locationGroup.data.length === 0) {
        state.future = state.future.filter(
          (locGroup) => locGroup.id !== locationGroup.id
        );
      }
    },
  },
});

const getLocationById = (state, action) => {
  const locationGroup = state.future.find(
    (locGroup) => locGroup.id === action.payload.locationGroupId
  );
  return locationGroup.data.find((loc) => loc.id === action.payload.locationId);
};

const getRoleById = (state, action) => {
  const locationGroup = state.future.find(
    (locGroup) => locGroup.id === action.payload.locationGroupId
  );
  const location = locationGroup.data.find(
    (loc) => loc.id === action.payload.locationId
  );
  return location.roles.find((r) => r.id === action.payload.roleId);
};

export const {
  toggleLocationStatus,
  changeLocationName,
  toggleLocationGroupStatus,
  toggleAllRolesStatusForOneLocation,
  toggleRoleStatus,
  changeRoleName,
  cancelChanges,
  saveLocationsToStorage,
  initLocations,
  returnToDefaultSettings,
  addNewLocationSlot,
  deleteLocation,
  toggleGameRolesStatus,
} = locationsSlice.actions;
export default locationsSlice.reducer;
