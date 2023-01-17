import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import GameSetup from "./pages/GameSetup";
import Locations from "./pages/Locations";
import COLORS from "./constants/colors";

export default function App() {
  return (
    <View style={styles.outerContainer}>
      <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
      <View style={styles.innerContainer}>
        {/* <GameSetup /> */}
        <Locations />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroud,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  innerContainer: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 25,
  },
});
