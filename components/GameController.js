import { useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, Vibration } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { v1 as uuidv1 } from "uuid";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Audio } from "expo-av";

import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import CustomButton from "./UI/CustomButton";
import CustomModal from "./UI/CustomModal";
import CustomDropdown from "./UI/CustomDropdown";

// const AlarmSound = require("../assets/NuclearAlarmSound.mp3");
const AlarmSound = require("../assets/ClockAlarmSound.mp3");

export default function GameController({
  enableButtons,
  location,
  spies,
  navigation,
  isGameStarted,
  setIsGameStarted,
  selectedGameTime,
  setSelectedGameTime,
}) {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [playTimer, setPlayTimer] = useState(false);
  const [sound, setSound] = useState(null);
  const [isAlarmFinished, setIsAlarmFinished] = useState(false);

  useEffect(() => {
    if (isAlarmFinished) {
      sound.unloadAsync();
    }
  }, [isAlarmFinished]);

  useEffect(() => {
    return navigation.addListener("beforeRemove", (event) => {
      if (isGameFinished) {
        return;
      }
      event.preventDefault();
    });
  }, [navigation, isGameFinished]);

  const finishGame = () => {
    setPlayTimer(false);
    setIsGameFinished(true);
  };

  const closeFinishModal = () => {
    setIsGameFinished(false);
    if (sound) sound.unloadAsync();
    Vibration.cancel();
    navigation.goBack();
  };

  const getSelectableTimeArray = () => {
    let result = [];
    for (let i = 1; i <= 20; i++) {
      result.push(i);
    }
    return result;
  };

  const startGameHandler = () => {
    setPlayTimer(true);
    setIsGameStarted(true);
  };

  const toggleTimerHandler = () => {
    setPlayTimer((state) => !state);
  };

  const countdownCompleteHandler = () => {
    setIsCountdownFinished(true);
    setPlayTimer(false);
    Vibration.vibrate([0, 800, 400, 800, 400, 800]);
    playSound();
  };

  const playbackStatusChangeHandler = (event) => {
    if (event.didJustFinish) {
      setIsAlarmFinished(true);
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        AlarmSound,
        undefined,
        playbackStatusChangeHandler
      );
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CustomModal show={isGameFinished} onClose={closeFinishModal}>
        {location && (
          <View style={{ flexDirection: "row" }}>
            <Text>Konum: </Text>
            <Text style={{ fontWeight: "bold" }}>{location}</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginHorizontal: GAP_BETWEEN_LAYERS,
              marginTop: GAP_BETWEEN_LAYERS / 2,
            }}
          >
            {location && (
              <>
                {spies.length > 0 &&
                  spies.map((spy) => (
                    <View
                      key={uuidv1()}
                      style={{
                        alignItems: "center",
                        width: "33%",
                      }}
                    >
                      <FontAwesome5
                        name="user-secret"
                        size={40}
                        color={COLORS.secondary}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          marginTop: GAP_BETWEEN_LAYERS / 2,
                        }}
                      >
                        {spy}
                      </Text>
                    </View>
                  ))}

                {spies.length === 0 && (
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: GAP_BETWEEN_LAYERS / 2,
                    }}
                  >
                    Casus Yoktu
                  </Text>
                )}
              </>
            )}

            {!location && (
              <View
                key={uuidv1()}
                style={{
                  alignItems: "center",
                  width: "33%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <FontAwesome5
                    name="user-secret"
                    size={40}
                    color={COLORS.secondary}
                  />
                  <FontAwesome5
                    name="user-secret"
                    size={40}
                    color={COLORS.secondary}
                  />
                  <FontAwesome5
                    name="user-secret"
                    size={40}
                    color={COLORS.secondary}
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: GAP_BETWEEN_LAYERS / 2,
                  }}
                >
                  Herkes Casustu
                </Text>
              </View>
            )}
          </View>
        </View>
      </CustomModal>

      <>
        {isGameStarted && (
          <View
            style={{
              alignItems: "center",
              marginBottom: GAP_BETWEEN_LAYERS,
            }}
          >
            <Pressable
              onPress={toggleTimerHandler}
              style={{ borderRadius: 100 }}
            >
              <CountdownCircleTimer
                isPlaying={playTimer}
                duration={selectedGameTime * 60}
                colors={[COLORS.success, COLORS.success, COLORS.error]}
                colorsTime={[selectedGameTime * 60, 30, 0]}
                trailColor={
                  isCountdownFinished ? COLORS.error : COLORS.lightGray
                }
                onComplete={countdownCompleteHandler}
              >
                {({ remainingTime }) => (
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    {remainingTime > 0 && (
                      <>
                        <Text
                          style={{
                            flex: 1,
                            textAlignVertical: "bottom",
                            color: COLORS.lightGray,
                            fontSize: 12,
                          }}
                        >
                          Kalan
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            textAlignVertical: "center",
                            color: COLORS.text,
                            fontSize: 30,
                          }}
                        >
                          {`${
                            Math.floor(remainingTime / 60) < 10 ? "0" : ""
                          }${Math.floor(remainingTime / 60)}:${
                            remainingTime % 60 < 10 ? "0" : ""
                          }${remainingTime % 60}`}
                        </Text>

                        {playTimer && (
                          <Ionicons
                            style={{ flex: 1 }}
                            name="pause"
                            size={32}
                            color={COLORS.secondary}
                          />
                        )}

                        {!playTimer && (
                          <Ionicons
                            style={{ flex: 1 }}
                            name="play"
                            size={32}
                            color={COLORS.secondary}
                          />
                        )}
                      </>
                    )}

                    {!remainingTime > 0 && (
                      <Text
                        style={{
                          flex: 1,
                          textAlignVertical: "center",
                          color: COLORS.text,
                          fontSize: 18,
                        }}
                      >
                        SÜRE BİTTİ
                      </Text>
                    )}
                  </View>
                )}
              </CountdownCircleTimer>
            </Pressable>
          </View>
        )}

        {!isGameStarted && (
          <>
            {/* <Seperator style={{ marginBottom: GAP_BETWEEN_LAYERS }} /> */}
            <View
              style={{
                height: LINE_HEIGHT * 2,
                flexDirection: "row",
                marginBottom: GAP_BETWEEN_LAYERS,
              }}
            >
              <CustomButton
                success
                style={{ flex: 2, marginRight: GAP_BETWEEN_LAYERS }}
                disabled={!enableButtons}
                onPress={startGameHandler}
              >
                Oyunu Başlat
              </CustomButton>

              <View style={{ flex: 1, width: "100%" }}>
                <CustomDropdown
                  data={getSelectableTimeArray()}
                  onSelect={(selectedItem, index) => {
                    setSelectedGameTime(selectedItem);
                  }}
                  defaultValue={selectedGameTime}
                  customizedButtonChild={(selectedItem, index) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="timer"
                          size={24}
                          color={COLORS.secondary}
                          style={{ paddingLeft: 2 }}
                        />
                        <Text
                          style={{
                            color: COLORS.textReverse,
                            fontSize: 24,
                          }}
                        >
                          {selectedItem}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </>
        )}

        <View style={{ height: LINE_HEIGHT }}>
          <CustomButton cancel onPress={finishGame}>
            Oyunu Sonlandır
          </CustomButton>
        </View>
      </>
    </>
  );
}
