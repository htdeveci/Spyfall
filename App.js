import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import GameSetup from "./GameSetup";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#cc7400" />
      <GameSetup style={{ marginTop: 50 }} />
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
