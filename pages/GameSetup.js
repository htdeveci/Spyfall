import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import CustomButton from "../components/UI/CustomButton";
import PlayerItem from "../components/PlayerItem";

export default function GameSetup(props) {
  const [players, setPlayers] = useState([]);
  const [numberOfSpy, setNumberOfSpy] = useState(1);

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

  const numberOfSpyChangeHandler = (value) => {
    setNumberOfSpy(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.playersLabel}>{players.length} OYUNCU</Text>
      {players.map((player) => {
        return (
          <PlayerItem
            key={player.id}
            player={player}
            removePlayer={removePlayerHandler}
            style={styles.verticalGap}
          />
        );
      })}

      <CustomButton
        style={styles.verticalGap}
        onPress={addPlayerHandler}
        height={50}
        fontSize={24}
      >
        Oyuncu Ekle
      </CustomButton>

      <View style={[styles.spyCountContainer, styles.verticalGap]}>
        <Text style={styles.text}>Casus Sayısı: {numberOfSpy}</Text>
        <Slider
          maximumValue={3}
          step={1}
          value={numberOfSpy}
          onValueChange={numberOfSpyChangeHandler}
          thumbTintColor="#ff9100"
          minimumTrackTintColor="#cc7400"
          maximumTrackTintColor="white"
          style={{ flex: 1, marginTop: 3 }}
        />
        <MaterialCommunityIcons name="pirate" size={42} color="#006eff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingHorizontal: 25,
  },
  playersLabel: {
    color: "#fff5e8",
    fontSize: 30,
    textAlign: "center",
  },
  text: {
    color: "#fff5e8",
    fontSize: 20,
  },
  spyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalGap: { marginVertical: 4 },
});
