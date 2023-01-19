import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/globalConstants";
import CustomTextInput from "./UI/CustomTextInput";

export default function PlayerItem(props) {
  const playerNameChangeHandler = (newPlayerName) => {
    // console.log(newPlayerName);
  };

  return (
    <View style={[styles.container, props.style]}>
      <CustomTextInput
        placeholder={props.player.name}
        onChangeText={playerNameChangeHandler}
      />

      <Ionicons
        name="remove-circle"
        size={30}
        color={COLORS.error}
        onPress={props.removePlayer.bind(null, props.player.id)}
        style={{
          alignSelf: "stretch",
          textAlignVertical: "center",
          paddingHorizontal: 10,
        }}
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
    paddingLeft: 10,
    backgroundColor: "#cccccc",
    borderRadius: 10,
  },
});
