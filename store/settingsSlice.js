import { createSlice } from "@reduxjs/toolkit";

let initialState = { enableRoles: true, makeEveryoneSpy: false };

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
    toggleMakeEveryoneSpy: (state) => {
      state.makeEveryoneSpy = !state.makeEveryoneSpy;
    },
  },
});

export const {
  toggleEnableRolesStatus,
  changeLanguage,
  toggleMakeEveryoneSpy,
} = settingsSlice.actions;
export default settingsSlice.reducer;
