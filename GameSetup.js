import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomButton from "./CustomButton";
import PlayerItem from "./PlayerItem";

export default function GameSetup(props) {
  const [players, setPlayers] = useState([]);

  const addPlayerHandler = () => {
    setPlayers((players) => [
      ...players,
      { name: `${players.length + 1}. Oyuncu`, id: uuidv1() },
    ]);
  };

  const removePlayerHandler = (playerId) => {
    setPlayers((players) => {
      return players.filter((player) => {
        return player.id != playerId;
      });
    });
  };

  return (
    <View style={styles.container}>
      {players.map((player) => {
        return (
          <PlayerItem
            key={player.id}
            player={player}
            removePlayer={removePlayerHandler}
          />
        );
      })}
      <CustomButton onPress={addPlayerHandler} height={60} fontSize={24}>
        Oyuncu Ekle
      </CustomButton>
      <Text style={styles.text}>Casus Sayısı: </Text>
      <MaterialCommunityIcons name="pirate" size={42} color="#bb3adb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 25,
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
