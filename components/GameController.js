import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { v1 as uuidv1 } from "uuid";

import {
  COLORS,
  GAP_BETWEEN_LAYERS,
  LINE_HEIGHT,
} from "../constants/globalConstants";
import CustomButton from "./UI/CustomButton";
import CustomModal from "./UI/CustomModal";
import CustomTextInput from "./UI/CustomTextInput";

export default function GameController({
  enableButtons,
  location,
  spies,
  navigation,
}) {
  const [isGameFinished, setIsGameFinished] = useState(false);

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

  return (
    <>
      <CustomModal show={isGameFinished} onClose={closeFinishModal}>
        <View style={{ flexDirection: "row" }}>
          <Text>Konum: </Text>
          <Text style={{ fontWeight: "bold" }}>{location}</Text>
        </View>

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
            {spies.map((spy) => (
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
          </View>
        </View>
      </CustomModal>
      <View>
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
          <CustomTextInput
            style={{
              flex: 1,
              backgroundColor: COLORS.lightGray,
              borderRadius: 10,
              fontSize: 30,
              textAlign: "center",
            }}
            value="10:00"
            onChangeText={() => console.log()}
          />
        </View>

        <View style={{ height: LINE_HEIGHT }}>
          <CustomButton cancel onPress={finishGame}>
            Oyunu Sonlandır
          </CustomButton>
        </View>
      </View>
    </>
  );
}
