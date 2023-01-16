import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PlayerItem(props) {
  return (
    <View style={styles.container}>
      <Text>{props.player.name}</Text>
      <Ionicons
        name="remove-circle"
        size={30}
        color="red"
        onPress={props.removePlayer.bind(null, props.player.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#cccccc",
  },
});
