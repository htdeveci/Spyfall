import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import CustomButton from "../components/UI/CustomButton";
import PlayerItem from "../components/PlayerItem";
import {
  COLORS,
  LINE_HEIGHT,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_LOCATIONS,
} from "../constants/globalConstants";
import { useDispatch, useSelector } from "react-redux";
import { addNewPlayerSlot, savePlayersToStorage } from "../store/playersSlice";
import { initLocations } from "../store/locationsSlice";
import CustomFlatList from "../components/UI/CustomFlatList";

export default function GameSetup({ navigation }) {
  const dispatch = useDispatch();
  const players = useSelector((store) => store.players);
  const [numberOfSpy, setNumberOfSpy] = useState(1);
  const maxSpyNumber = 3;

  const addPlayerHandler = () => {
    dispatch(addNewPlayerSlot({ newPlayer: { playerName: "", id: uuidv1() } }));
  };

  const numberOfSpyChangeHandler = (value) => {
    setNumberOfSpy(value);
  };

  const locationsButtonHandler = () => {
    dispatch(initLocations());
    navigation.navigate(NAVIGATION_NAME_LOCATIONS);
  };

  const isGameReady = () => {
    return players.length > 0 && numberOfSpy <= players.length;
  };

  const startGameHandler = () => {
    if (isGameReady())
      navigation.navigate(NAVIGATION_NAME_GAMEPLAY, { numberOfSpy });
  };

  const renderPlayers = (item) => {
    return (
      <View style={styles.lineHeight} key={item.item.id}>
        <PlayerItem player={item.item} style={styles.verticalGap} />
      </View>
    );
  };

  const renderControllers = () => {
    return (
      <>
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
        <View style={[styles.lineHeight, styles.verticalGap]}>
          <CustomButton onPress={locationsButtonHandler}>mekanlar</CustomButton>
        </View>
        <View style={[{ height: LINE_HEIGHT * 2 }, styles.verticalGap]}>
          <CustomButton
            onPress={startGameHandler}
            disabled={!isGameReady()}
            success
            fontSize={30}
          >
            OYUNU BAŞLAT
          </CustomButton>
        </View>
      </>
    );
  };

  return (
    <CustomFlatList
      data={players}
      listLabel={`${players.length} OYUNCU`}
      renderItem={renderPlayers}
      FooterComponent={renderControllers}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
    fontSize: 20,
  },
  lineHeight: {
    height: LINE_HEIGHT,
  },
  spyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalGap: { marginVertical: 4 },
});
