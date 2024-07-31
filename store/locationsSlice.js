import { createSlice, current } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

import locationsDefaultsTR from "../assets/locations-defaults-tr.json";
import locationsDefaultsEN from "../assets/locations-defaults-en.json";

let initialState = {
  current: locationsDefaultsTR,
  future: locationsDefaultsTR,
  canRolesExpandable: true,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    initLocations: (state) => {
      return { ...state, future: state.current };
    },
    returnToDefaultLocations: (state, action) => {
      const { currentLanguage, deleteCustomGroup } = action.payload;

      let defaults = getDefaultsFileByLanguage(currentLanguage);

      if (!deleteCustomGroup) {
        const customGroup = state.current.find((locGroup) => locGroup.custom);
        defaults = customGroup ? [...defaults, customGroup] : defaults;
      }

      return {
        ...state,
        future: defaults,
      };
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
      const location = getLocationById(state.future, action);
      location.enabled = !location.enabled;
    },
    changeLocationName: (state, action) => {
      const location = getLocationById(state.future, action);
      location.changed =
        location.locationName !== action.payload.locationName ||
        location.changed;
      location.locationName = action.payload.locationName;
    },
    changeAllRolesStatusForOneLocation: (state, action) => {
      const location = getLocationById(state.future, action);
      location.roles.forEach((role) => {
        role.enabled = action.payload.status;
      });
    },
    toggleRoleStatus: (state, action) => {
      const role = getRoleById(state.future, action);
      role.enabled = !role.enabled;
    },
    changeRoleName: (state, action) => {
      const role = getRoleById(state.future, action);
      role.changed = role.roleName !== action.payload.roleName || role.changed;
      role.roleName = action.payload.roleName;
    },
    cancelChanges: (state) => {
      return { ...state, future: state.current };
    },
    saveLocationsToStorage: (state) => {
      return { ...state, current: state.future };
    },
    addNewLocationSlot: (state, action) => {
      let customGroup = state.future.find(
        (locGroup) => locGroup.title === action.payload.customGroupTitle
      );

      if (!customGroup) {
        customGroup = {
          title: action.payload.customGroupTitle,
          id: uuidv1(),
          custom: true,
          enabled: true,
          data: [],
        };

        state.future.push(customGroup);
      }

      customGroup.data.push({
        changed: true,
        locationName: "",
        id: uuidv1(),
        enabled: true,
        roles: [
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
          { enabled: true, changed: true, roleName: "", id: uuidv1() },
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
    translateAllLocationsAndRolesNames: (state, action) => {
      const { languageCode, customGroupTitle } = action.payload;

      // this if state written for older versions of app updated succesfully, can be deleted later on
      if (state.canRolesExpandable === undefined) {
        state.canRolesExpandable = true;
      }

      const translatedLocsAndRoles = [...state.current];

      try {
        translatedLocsAndRoles.forEach((locationGroup) => {
          // this if state written for older versions of app updated succesfully, can be deleted later on
          if (locationGroup.title.toLowerCase() === "özel") {
            locationGroup.custom = true;
          }

          if (locationGroup.custom) {
            locationGroup.title = customGroupTitle;
            return;
          } else {
            locationGroup.title = getLocationGroupById(
              getDefaultsFileByLanguage(languageCode),
              locationGroup.id
            ).title;
          }

          locationGroup.data.forEach((location) => {
            // this if state written for older versions of app updated succesfully, can be deleted later on
            if (location.changed === undefined) {
              location.changed = false;
            }

            if (!location.changed) {
              location.locationName = getLocationById(
                getDefaultsFileByLanguage(languageCode),
                {
                  payload: {
                    locationGroupId: locationGroup.id,
                    locationId: location.id,
                  },
                }
              ).locationName;
            }

            location.roles.forEach((role) => {
              // this if state written for older versions of app updated succesfully, can be deleted later on
              if (role.changed === undefined) {
                role.changed = false;
              }

              if (!role.changed) {
                role.roleName = getRoleById(
                  getDefaultsFileByLanguage(languageCode),
                  {
                    payload: {
                      locationGroupId: locationGroup.id,
                      locationId: location.id,
                      roleId: role.id,
                    },
                  }
                ).roleName;
              }
            });
          });
        });
      } catch (error) {
        throw error;
      }
    },
    changeCanRolesExpandable: (state, action) => {
      return {
        ...state,
        canRolesExpandable: action.payload.canRolesExpandable,
      };
    },
  },
});

const getDefaultsFileByLanguage = (currentLanguage) => {
  switch (currentLanguage) {
    case "tr":
      return locationsDefaultsTR;
    default:
      return locationsDefaultsEN;
  }
};

/* const getTranslatedLocationGroupById = (locationGroupId, selectedLanguage) => {
  const locationGroup = getLocationGroupById(
    getDefaultsFileByLanguage(selectedLanguage),
    locationGroupId
  );
  return locationGroup;
}; */

const getLocationGroupById = (locations, locationGroupId) => {
  return locations.find((locGroup) => locGroup.id === locationGroupId);
};

const getLocationById = (locations, action) => {
  const locationGroup = getLocationGroupById(
    locations,
    action.payload.locationGroupId
  );
  return locationGroup.data.find((loc) => loc.id === action.payload.locationId);
};

const getRoleById = (locations, action) => {
  const locationGroup = getLocationGroupById(
    locations,
    action.payload.locationGroupId
  );
  const location = locationGroup.data.find(
    (loc) => loc.id === action.payload.locationId
  );
  return location.roles.find((r) => r.id === action.payload.roleId);
};

/* const getLocationDefaultByLanguage = (
  selectedLanguage,
  locationGroupId,
  locationId
) => {
  const locationDefaultFile = getDefaultsFileByLanguage(selectedLanguage);

  const action = {
    payload: { locationGroupId, locationId },
  };

  return getLocationById(locationDefaultFile, action);
}; */

export const {
  toggleLocationStatus,
  changeLocationName,
  toggleLocationGroupStatus,
  changeAllRolesStatusForOneLocation,
  toggleRoleStatus,
  changeRoleName,
  cancelChanges,
  saveLocationsToStorage,
  initLocations,
  returnToDefaultLocations,
  addNewLocationSlot,
  deleteLocation,
  translateAllLocationsAndRolesNames,
  changeCanRolesExpandable,
} = locationsSlice.actions;
export default locationsSlice.reducer;
