import { configureStore } from "@reduxjs/toolkit";

import locationsSlice from "./locationsSlice";

const store = configureStore({
  reducer: { locations: locationsSlice },
});

export default store;
