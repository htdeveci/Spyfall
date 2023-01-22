import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import Location from "../components/Location";
import CustomButton from "../components/UI/CustomButton";
import { COLORS } from "../constants/globalConstants";
import useLocation from "../hooks/location-hook";
import locationsDefaults from "../locations-defaults.json";
import { cancelChanges, saveLocationsToFile } from "../store/locationsSlice";

const lineHeight = 50;

export default function Locations({ navigation }) {
  // const { locations } = useLocation();
  // const storedLocations = useSelector((state) => state.locations);
  const [locations, setLocations] = useState(locationsDefaults);
  const dispatch = useDispatch();

  const cancelHandler = () => {
    // console.log(locations);
    dispatch(cancelChanges());
    // setLocations(locationsDefaults);
    navigation.goBack();
  };

  const saveLocationsHandler = () => {
    dispatch(saveLocationsToFile());
  };

  const getLocationComponents = () => {
    let locationComponents = [];
    for (let i = 0; i < locations.length; i++) {
      locationComponents.push(
        <Location key={uuidv1()} locationIndex={i} height={lineHeight} />
      );
    }
    return locationComponents;
  };

  return (
    <>
      <Text style={styles.locationsLabel}>MEKANLAR</Text>
      <View style={styles.container}>
        {getLocationComponents()}

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
