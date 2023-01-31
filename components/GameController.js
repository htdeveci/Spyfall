import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { v1 as uuidv1 } from "uuid";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import CustomButton from "./UI/CustomButton";
import CustomModal from "./UI/CustomModal";
import CustomTextInput from "./UI/CustomTextInput";
import SelectDropdown from "react-native-select-dropdown";
import CustomDropdown from "./UI/CustomDropdown";
import Card from "./UI/Card";

export default function GameController({
  enableButtons,
  location,
  spies,
  navigation,
}) {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [selectedGameTime, setSelectedGameTime] = useState(10);

  useEffect(() => {
    return navigation.addListener("beforeRemove", (event) => {
      if (isGameFinished) {
        return;
      }
      event.preventDefault();
    });
  }, [navigation, isGameFinished]);

  const finishGame = () => {
    setIsGameFinished(true);
  };

  const closeFinishModal = () => {
    setIsGameFinished(false);
    navigation.goBack();
  };

  const getSelectableTimeArray = () => {
    let result = [];
    for (let i = 1; i <= 20; i++) {
      result.push(i);
    }
    return result;
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

      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          // backgroundColor: "red",
          alignItems: "center",
          marginBottom: GAP_BETWEEN_LAYERS,
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={70}
          colors={[COLORS.success, COLORS.success, COLORS.error]}
          colorsTime={[70, 30, 0]}
          trailColor={COLORS.lightGray}
        >
          {({ remainingTime }) => (
            <Text style={{ color: COLORS.text, fontSize: 30 }}>
              {`${Math.floor(remainingTime / 60) < 10 ? "0" : ""}${Math.floor(
                remainingTime / 60
              )}:${remainingTime % 60 < 10 ? "0" : ""}${remainingTime % 60}`}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>

      <View
        style={{
          height: LINE_HEIGHT * 2,
          flexDirection: "row",
          marginBottom: GAP_BETWEEN_LAYERS,
        }}
      >
        <CustomButton
          success
          style={{ flex: 3, marginRight: GAP_BETWEEN_LAYERS }}
          disabled={!enableButtons}
        >
          Zamanlayıcıyı Başlat
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

      <View style={{ height: LINE_HEIGHT }}>
        <CustomButton cancel onPress={finishGame}>
          Oyunu Sonlandır
        </CustomButton>
      </View>
    </>
  );
}
