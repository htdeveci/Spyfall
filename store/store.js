import "react-native-get-random-values";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";

import locationReducers from "./locationsSlice";
import playerReducers from "./playersSlice";
import settingsReducers from "./settingsSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  locations: locationReducers,
  players: playerReducers,
  settings: settingsReducers,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
