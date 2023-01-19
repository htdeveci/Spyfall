import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import { COLORS } from "../constants/globalConstants";
import locationsDefaults from "../locations-defaults.json";

const lineHeight = 50;

export default function Locations({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(locationsDefaults);
  }, []);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const saveLocationsHandler = () => {
    console.log(locations);
  };

  return (
    <>
      <Text style={styles.locationsLabel}>MEKANLAR</Text>
      <View style={styles.container}>
        {locations.map((location) => {
          return (
            <Location
              key={uuidv1()}
              location={location}
              onLocationChange={(updatedLocation) => {
                console.log(updatedLocation);
                // setLocations({ ...locations, location: updatedLocation });
              }}
              height={lineHeight}
            />
          );
        })}

        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={cancelHandler}
            cancel
            style={{ marginRight: 5 }}
          >
            İptal
          </CustomButton>
          <CustomButton
            style={{ marginLeft: 5 }}
            onPress={saveLocationsHandler}
          >
            Kaydet
          </CustomButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    height: lineHeight,
  },
  locationsLabel: {
    color: COLORS.text,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
});
