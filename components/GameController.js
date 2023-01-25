import { useState } from "react";
import { Text, View } from "react-native";
import { COLORS, LINE_HEIGHT } from "../constants/globalConstants";
import CustomButton from "./UI/CustomButton";
import CustomModal from "./UI/CustomModal";
import CustomTextInput from "./UI/CustomTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GameController({
  gapBetweenLayers,
  enableButtons,
  location,
  spies,
}) {
  const [isGameFinished, setIsGameFinished] = useState(false);

  const finishGame = () => {
    setIsGameFinished(true);
  };

  const closeFinishModal = () => {
    setIsGameFinished(false);
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
          <MaterialCommunityIcons
            name="pirate"
            size={40}
            color={COLORS.secondary}
          />
          <View style={{ marginHorizontal: gapBetweenLayers }}>
            {spies.map((s) => (
              <Text key={s} style={{ textAlign: "center", fontWeight: "bold" }}>
                {s}
              </Text>
            ))}
          </View>
          <MaterialCommunityIcons
            name="pirate"
            size={40}
            color={COLORS.secondary}
          />
        </View>
      </CustomModal>
      <View>
        <View
          style={{
            height: LINE_HEIGHT * 2,
            flexDirection: "row",
            marginBottom: gapBetweenLayers,
          }}
        >
          <CustomButton
            success
            style={{ flex: 3, marginRight: gapBetweenLayers }}
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
          <CustomButton cancel disabled={!enableButtons} onPress={finishGame}>
            Oyunu Sonlandır
          </CustomButton>
        </View>
      </View>
    </>
  );
}
