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

export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
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
          <Stack.Screen
            name={NAVIGATION_NAME_LOCATIONS}
            component={Locations}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
