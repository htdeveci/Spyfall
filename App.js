import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import GameSetup from "./pages/GameSetup";
import Locations from "./pages/Locations";
import {
  COLORS,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
} from "./constants/globalConstants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import { initLocations } from "./store/locationsSlice";
import Deneme from "./deneme";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: [
              styles.container,
              { backgroundColor: COLORS.backgroud },
            ],
          }}
        >
          <Stack.Screen
            name={NAVIGATION_NAME_GAME_SETUP}
            component={GameSetup}
          />
          <Stack.Screen name="Deneme" component={Deneme} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroud,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 25,
  },
});
