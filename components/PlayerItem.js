import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PlayerItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={styles.textInput}
        placeholder={props.player.name}
        selectionColor="#006eff"
        cursorColor="#ff9100"
      />
      <Ionicons
        name="remove-circle"
        size={30}
        color="#ff473a"
        onPress={props.removePlayer.bind(null, props.player.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 4,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#cccccc",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
});
