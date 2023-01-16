import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomButton from "./CustomButton";
import PlayerItem from "./PlayerItem";
import Slider from "@react-native-community/slider";

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

      <View style={styles.spyCountContainer}>
        <Text style={styles.text}>Casus Sayısı: {numberOfSpy}</Text>
        <Slider
          maximumValue={3}
          step={1}
          value={numberOfSpy}
          onValueChange={numberOfSpyChangeHandler}
          thumbTintColor="#ff9100"
          minimumTrackTintColor="#cc7400"
          maximumTrackTintColor="white"
          style={{ flex: 1 }}
        />
        <MaterialCommunityIcons name="pirate" size={42} color="#9100ff" />
      </View>
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
    fontSize: 20,
  },
  spyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
});
