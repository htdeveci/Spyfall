import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import GameSetup from "./pages/GameSetup";
import {
  COLORS,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
} from "./constants/globalConstants";
import store from "./store/store";
import Deneme from "./Deneme";

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
