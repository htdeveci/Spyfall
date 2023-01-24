import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import CustomButton from "../components/UI/CustomButton";
import PlayerItem from "../components/PlayerItem";
import {
  COLORS,
  NAVIGATION_NAME_LOCATIONS,
  STORE_ACTIVE_PLAYERS,
} from "../constants/globalConstants";
import { useDispatch, useSelector } from "react-redux";
import { addNewPlayerSlot } from "../store/playersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GameSetup({ navigation }) {
  const players = useSelector((store) => store.players);
  const dispatch = useDispatch();
  // const [players, setPlayers] = useState([]);
  const [numberOfSpy, setNumberOfSpy] = useState(1);
  const maxSpyNumber = 3;

  const addPlayerHandler = () => {
    dispatch(addNewPlayerSlot({ newPlayer: { playerName: "", id: uuidv1() } }));
  };

  const numberOfSpyChangeHandler = (value) => {
    setNumberOfSpy(value);
  };

  const locationsButtonHandler = () => {
    navigation.navigate("Deneme");
  };

  return (
    <>
      <Text style={styles.playersLabel}>{players.length} OYUNCU</Text>
      {players.map((player) => {
        return (
          <View style={styles.lineHeight} key={player.id}>
            <PlayerItem player={player} style={styles.verticalGap} />
          </View>
        );
      })}
      <View style={styles.lineHeight}>
        <CustomButton
          style={styles.verticalGap}
          onPress={addPlayerHandler}
          fontSize={20}
        >
          Oyuncu Ekle
        </CustomButton>
      </View>
      <View style={[styles.spyCountContainer, styles.verticalGap]}>
        <Text style={styles.text}>Casus Sayısı: {numberOfSpy}</Text>
        <Slider
          maximumValue={maxSpyNumber}
          step={1}
          value={numberOfSpy}
          onValueChange={numberOfSpyChangeHandler}
          thumbTintColor={COLORS.primary}
          minimumTrackTintColor={COLORS.primaryDark}
          maximumTrackTintColor={COLORS.text}
          style={{ flex: 1, marginTop: 3 }}
        />
        <View
          style={{
            borderColor: COLORS.secondary,
            borderStyle: "dashed",
            borderWidth: 2,
            padding: 5,
            paddingRight: 4,
            borderRadius: 10,
          }}
        >
          <MaterialCommunityIcons
            name="pirate"
            size={40}
            color={COLORS.secondary}
            style={{
              opacity: numberOfSpy / maxSpyNumber,
            }}
          />
        </View>
      </View>
      <View style={styles.lineHeight}>
        <CustomButton onPress={locationsButtonHandler}>mekanlar</CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  playersLabel: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 6,
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
  },
  lineHeight: {
    height: 55,
  },
  spyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalGap: { marginVertical: 4 },
});
