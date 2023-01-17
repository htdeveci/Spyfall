import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function PlayerItem(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        style={styles.textInput}
        placeholder={props.player.name}
        selectionColor={COLORS.secondary}
        cursorColor={COLORS.primary}
      />
      <Ionicons
        name="remove-circle"
        size={30}
        color={COLORS.error}
        onPress={props.removePlayer.bind(null, props.player.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: COLORS.textReverse,
  },
});
