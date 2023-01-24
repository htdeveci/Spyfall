import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/globalConstants";
import CustomTextInput from "./UI/CustomTextInput";
import { useDispatch } from "react-redux";
import { changePlayerName, deletePlayer } from "../store/playersSlice";

export default function PlayerItem({ style, player }) {
  const dispatch = useDispatch();

  const playerNameChangeHandler = (newPlayerName) => {
    dispatch(changePlayerName({ id: player.id, newPlayerName }));
  };

  const removePlayerHandler = () => {
    dispatch(deletePlayer({ playerId: player.id }));
  };

  return (
    <View style={[styles.container, style]}>
      <CustomTextInput
        placeholder="Oyuncu Adı"
        onChangeText={playerNameChangeHandler}
        value={player.playerName}
      />

      <Ionicons
        name="remove-circle"
        size={30}
        color={COLORS.error}
        onPress={removePlayerHandler}
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
