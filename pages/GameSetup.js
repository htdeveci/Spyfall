import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { v1 as uuidv1 } from "uuid";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import CustomButton from "../components/UI/CustomButton";
import PlayerItem from "../components/PlayerItem";
import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
  NAVIGATION_NAME_GAMEPLAY,
  NAVIGATION_NAME_LOCATIONS,
} from "../constants/globalConstants";
import { useDispatch, useSelector } from "react-redux";
import { addNewPlayerSlot, savePlayersToStorage } from "../store/playersSlice";
import { initLocations } from "../store/locationsSlice";
import CustomFlatList from "../components/UI/CustomFlatList";
import Seperator from "../components/UI/Seperator";

export default function GameSetup({ navigation }) {
  const dispatch = useDispatch();
  const players = useSelector((store) => store.players);
  const locations = useSelector((store) => store.locations.current);
  const enabledLocations = locations.filter((loc) => loc.enabled === true);
  const [numberOfSpy, setNumberOfSpy] = useState(1);

  const maxSpyNumber = 3;

  const addPlayerHandler = () => {
    dispatch(addNewPlayerSlot({ newPlayer: { playerName: "", id: uuidv1() } }));
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
      <View style={styles.line} key={item.item.id}>
        <PlayerItem player={item.item} />
      </View>
    );
  };

  const renderControllers = () => {
    const [numberOfSpyInRender, setNumberOfSpyInRender] = useState(numberOfSpy);

    const numberOfSpyChangeHandler = (value) => {
      setNumberOfSpyInRender(value);
    };

    return (
      <>
        <View style={styles.line}>
          <CustomButton onPress={addPlayerHandler} fontSize={20}>
            Oyuncu Ekle
          </CustomButton>
        </View>

        <View style={[styles.spyCountContainer, styles.line]}>
          <Text style={styles.text}>Casus Sayısı: {numberOfSpyInRender}</Text>
          <Slider
            maximumValue={maxSpyNumber}
            step={1}
            value={numberOfSpyInRender}
            onValueChange={numberOfSpyChangeHandler}
            onSlidingComplete={(value) => {
              setNumberOfSpy(value);
            }}
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
              borderRadius: 10,
              width: LINE_HEIGHT,
              height: LINE_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="user-secret"
              size={40}
              color={COLORS.secondary}
              style={{
                opacity: numberOfSpyInRender / maxSpyNumber,
              }}
            />
          </View>
        </View>

        <View style={[styles.line, { flexDirection: "row" }]}>
          <CustomButton
            onPress={locationsButtonHandler}
            icon
            iconLabel="Roller"
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
          >
            <Ionicons name="person" size={30} color={COLORS.text} />
          </CustomButton>

          <CustomButton
            onPress={locationsButtonHandler}
            secondary
            icon
            iconLabel={`Mekanlar: ${enabledLocations.length}/${locations.length}`}
            style={{ marginLeft: GAP_BETWEEN_LAYERS / 2 }}
          >
            <Entypo name="location" size={30} color={COLORS.text} />
          </CustomButton>
        </View>

        <View style={{ height: LINE_HEIGHT * 2 }}>
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
    <>
      <CustomFlatList
        data={players}
        listLabel={`${players.length} OYUNCU`}
        renderItem={renderPlayers}
        FooterComponent={renderControllers}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
    fontSize: 20,
  },
  line: {
    height: LINE_HEIGHT,
    marginBottom: GAP_BETWEEN_LAYERS,
  },
  spyCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
