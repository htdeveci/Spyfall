import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GameSetup from "./pages/GameSetup";
import {
  COLORS,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
} from "./constants/globalConstants";
import store from "./store/store";
import Deneme from "./Deneme";
import Gameplay from "./pages/Gameplay";
import Locations from "./pages/Locations";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      <Deneme />
    </Provider>
  );
}
