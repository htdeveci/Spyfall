import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
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
import { addNewPlayerSlot } from "../store/playersSlice";
import {
  initLocations,
  toggleGameRolesStatus,
  toggleRoleStatus,
} from "../store/locationsSlice";
import CustomFlatList, { goToBottom } from "../components/UI/CustomFlatList";
import BorderedView from "../components/UI/BorderedView";

export const getEnabledLocationsLength = (locationGroups) => {
  let result = 0;
  locationGroups.forEach((locGroup) => {
    if (locGroup.enabled) {
      locGroup.data.forEach((loc) => {
        if (loc.enabled) {
          result++;
        }
      });
    }
  });
  return result;
};

export const getTotalLocationsLength = (locationGroups) => {
  let result = 0;
  locationGroups.forEach((locGroup) => {
    result += locGroup.data.length;
  });
  return result;
};

export default function GameSetup({ navigation }) {
  const dispatch = useDispatch();
  const players = useSelector((store) => store.players);
  const locationGroups = useSelector((store) => store.locations.current);
  const enableRoles = useSelector((store) => store.locations.enableRoles);
  // const enabledLocations = locationGroups.filter((loc) => loc.enabled === true);
  const [numberOfSpy, setNumberOfSpy] = useState(1);
  // const [enableRoles, setEnableRoles] = useState(true);

  const maxSpyNumber = 3;

  const addPlayerHandler = () => {
    dispatch(addNewPlayerSlot());
    goToBottom();
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

  const toggleRolesEnabled = () => {
    dispatch(toggleGameRolesStatus());
  };

  const renderPlayers = (item) => {
    return (
      <View
        style={
          item.index + 1 !== players.length
            ? styles.line
            : { height: LINE_HEIGHT }
        }
        key={item.item.id}
      >
        <PlayerItem player={item.item} />
      </View>
    );
  };

  const renderControllers = () => {
    const [numberOfSpyInRender, setNumberOfSpyInRender] = useState(numberOfSpy);

    const numberOfSpyChangeHandler = (value) => {
      setNumberOfSpyInRender(value);
    };

    const getSpySliderOpacity = () => {
      switch (numberOfSpyInRender) {
        case 0:
          return 0;
        case 1:
          return 0.5;
        case 2:
          return 0.75;
        case 3:
          return 1;
        default:
          return 1;
      }
    };

    return (
      <BorderedView>
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
              style={{ opacity: getSpySliderOpacity() }}
            />
          </View>
        </View>

        <View style={[styles.line, { flexDirection: "row" }]}>
          <CustomButton
            onPress={toggleRolesEnabled}
            secondary
            iconLabel="Roller"
            style={{ marginRight: GAP_BETWEEN_LAYERS / 2 }}
            useOpacity={false}
            customChildren
          >
            <Switch
              onValueChange={toggleRolesEnabled}
              value={enableRoles}
              thumbColor={enableRoles ? COLORS.primary : COLORS.darkGray}
              trackColor={{
                false: COLORS.lightGray,
                true: COLORS.primaryDark,
              }}
            />
          </CustomButton>

          <CustomButton
            onPress={locationsButtonHandler}
            secondary
            iconLabel={`Mekanlar ${getEnabledLocationsLength(
              locationGroups
            )}/${getTotalLocationsLength(locationGroups)}`}
            style={{ marginLeft: GAP_BETWEEN_LAYERS / 2 }}
            customChildren
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
      </BorderedView>
    );
  };

  return (
    <>
      <CustomFlatList
        data={players}
        listLabel={`${players.length} OYUNCU`}
        renderItem={renderPlayers}
      />
      {renderControllers()}
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
