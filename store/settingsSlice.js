import { createSlice } from "@reduxjs/toolkit";

let initialState = { enableRoles: true };

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    toggleEnableRolesStatus: (state) => {
      state.enableRoles = !state.enableRoles;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

export const { toggleEnableRolesStatus, changeLanguage } =
  settingsSlice.actions;
export default settingsSlice.reducer;
