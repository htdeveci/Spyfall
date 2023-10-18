import Locations from "../pages/Locations";
import {
  COLORS,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
} from "../constants/globalConstants";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GameSetup from "../pages/GameSetup";
import Gameplay from "../pages/Gameplay";

export default function RootComponent() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: [styles.container, { backgroundColor: COLORS.backgroud }],
        }}
      >
        <Stack.Screen name={NAVIGATION_NAME_GAME_SETUP} component={GameSetup} />
        <Stack.Screen name={NAVIGATION_NAME_LOCATIONS} component={Locations} />
        <Stack.Screen name={NAVIGATION_NAME_GAMEPLAY} component={Gameplay} />
      </Stack.Navigator>
    </NavigationContainer>
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
