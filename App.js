import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import GameSetup from "./pages/GameSetup";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#cc7400" />
      <GameSetup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
