import { configureStore } from "@reduxjs/toolkit";

import locationsSlice from "./locationsSlice";
import playerSlice from "./playersSlice";

const store = configureStore({
  reducer: { locations: locationsSlice, players: playerSlice },
});

export default store;
