import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { COLORS } from "./constants/globalConstants";
import store, { persistor } from "./store/store";
import RootComponent from "./components/RootComponent";
import "./translation/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // AsyncStorage.clear();

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
}
