import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import Locations from "./pages/Locations";
import { initLocations } from "./store/locationsSlice";
import locationsDefaults from "./locations-defaults.json";
import {
  COLORS,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
  STORE_ACTIVE_LOCATIONS,
} from "./constants/globalConstants";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GameSetup from "./pages/GameSetup";
import Gameplay from "./pages/Gameplay";

export default function Deneme() {
  const Stack = createStackNavigator();
  // const dispatch = useDispatch();

  // const [storedLocations, setStoredLocations] = useState(null);

  /*  const getLocations = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORE_ACTIVE_LOCATIONS);
      return jsonValue === null ? locationsDefaults : JSON.parse(jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLocations = async () => {
    const storedLocations = await getLocations();
    console.log(storedLocations.length);
    dispatch(initLocations({ storedLocations }));
    // setStoredLocations(storedLocations);
  };
  fetchLocations(); */

  /* useEffect(() => {
    const fetchLocations = async () => {
      const storedLocations = await getLocations();
      console.log(storedLocations.length);
      dispatch(initLocations({ storedLocations }));
      // setStoredLocations(storedLocations);
    };
    fetchLocations();
  }, []); */

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
