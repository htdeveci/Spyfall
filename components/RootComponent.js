import Locations from "../pages/Locations";
import {
  COLORS,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_GAME_SETUP,
  NAVIGATION_NAME_LOCATIONS,
  NAVIGATION_NAME_SETTINGS,
} from "../constants/globalConstants";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GameSetup from "../pages/GameSetup";
import Gameplay from "../pages/Gameplay";
import Settings from "../pages/Settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translateAllPlayersName } from "../store/playersSlice";
import {
  returnToDefaultLocations,
  saveLocationsToStorage,
  translateAllLocationsAndRolesNames,
} from "../store/locationsSlice";

export default function RootComponent() {
  const Stack = createStackNavigator();
  const language = useSelector((store) => store.settings.language);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }

    dispatch(
      translateAllPlayersName({
        playerLocalName: t("PlayerSlice.playerLocalName"),
      })
    );

    try {
      dispatch(
        translateAllLocationsAndRolesNames({
          languageCode: i18n.language,
          customGroupTitle: t("LocationsSlice.customGroupTitle"),
        })
      );
    } catch (error) {
      console.log(error);
      returnDefaultLocations();
    }
  }, []);

  const returnDefaultLocations = async () => {
    await dispatch(
      returnToDefaultLocations({ currentLanguage: i18n.language })
    );
    await dispatch(saveLocationsToStorage());
  };

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
        <Stack.Screen name={NAVIGATION_NAME_SETTINGS} component={Settings} />
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
